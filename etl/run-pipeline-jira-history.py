# set up Fireworks.ai Key
import os
import json
import requests
import pandas as pd
import pymongo
from datasets import load_dataset
from llama_index.core import Document, VectorStoreIndex, StorageContext
from llama_index.core.schema import MetadataMode
from llama_index.core.node_parser import SentenceSplitter
from llama_index.vector_stores.mongodb import MongoDBAtlasVectorSearch
from llama_index.core.settings import Settings
from llama_index.llms.fireworks import Fireworks
from llama_index.embeddings.fireworks import FireworksEmbedding


fw_api_key = os.environ["FIREWORKS_API_KEY"]
dataset = load_dataset('goup/jira_history')

# Convert the dataset to a pandas dataframe
dataset_df = pd.DataFrame(dataset["train"])

embed_model = FireworksEmbedding(
    embed_batch_size=512,
    model_name="nomic-ai/nomic-embed-text-v1.5",
    api_key=fw_api_key,
)
llm = Fireworks(
    temperature=0,
    model="accounts/fireworks/models/mixtral-8x7b-instruct",
    api_key=fw_api_key,
)

Settings.llm = llm
Settings.embed_model = embed_model

# Convert the DataFrame to a JSON string representation
documents_json = dataset_df.to_json(orient="records")
# Load the JSON string into a Python list of dictionaries
documents_list = json.loads(documents_json)

llama_documents = []

l=["employee_id","work_item_id","created_date","started_date","completed_date","total_duration","active_duration","work_type","sentiment_score"]
for document in documents_list:
    for key in l:
        document[key] = json.dumps(document[key])
    
    

    # Create a Document object with the text and excluded metadata for llm and embedding models
    llama_document = Document(
        text=json.dumps(document),
        metadata=document,
        metadata_template="{key}=>{value}",
        text_template="Metadata: {metadata_str}\n-----\nContent: {content}",
    )

    llama_documents.append(llama_document)

# Observing an example of what the LLM and Embedding model receive as input
print(
    "\nThe LLM sees this: \n",
    llama_documents[0].get_content(metadata_mode=MetadataMode.LLM),
)
print(
    "\nThe Embedding model sees this: \n",
    llama_documents[0].get_content(metadata_mode=MetadataMode.EMBED),
)

llama_documents[0]

parser = SentenceSplitter()
nodes = parser.get_nodes_from_documents(llama_documents)
# 25k nodes takes about 10 minutes, will trim it down to 2.5k
new_nodes = nodes[:2500]

# There are 25k documents, so we need to do batching. Fortunately LlamaIndex provides good batching
# for embedding models, and we are going to rely on the __call__ method for the model to handle this
node_embeddings = embed_model(new_nodes)

for idx, n in enumerate(new_nodes):
    n.embedding = node_embeddings[idx].embedding
    if "_id" in n.metadata:
        del n.metadata["_id"]


def get_mongo_client(mongo_uri):
    """Establish connection to the MongoDB."""
    try:
        client = pymongo.MongoClient(mongo_uri)
        print("Connection to MongoDB successful")
        return client
    except pymongo.errors.ConnectionFailure as e:
        print(f"Connection failed: {e}")
        return None

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    print("MONGO_URI not set")

mongo_client = get_mongo_client(mongo_uri)

DB_NAME = "synergy-db"
COLLECTION_NAME = "jira_history"

db = mongo_client[DB_NAME]
collection = db[COLLECTION_NAME]
collection.delete_many({})

vector_store = MongoDBAtlasVectorSearch(
    mongo_client,
    db_name=DB_NAME,
    collection_name=COLLECTION_NAME,
    index_name="vector_index",
)
vector_store.add(new_nodes)

index = VectorStoreIndex.from_vector_store(vector_store)