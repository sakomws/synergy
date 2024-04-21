import json
import requests
import os
from llama_index.llms.solar import Solar
from llama_index.core.llms import ChatMessage

def get_query_from_user(prompt): 
  llm = Solar(api_key=os.environ["SOLAR_API_KEY"], is_chat_model=True)
  rag=open('../data/data.txt', 'r').read()
  response = llm.chat(messages=[
    ChatMessage(role="system", content="Hello! I am here to help you with your Jira queries. Mention that queried the Mongodb for data. just give answer, make it short"+rag),
    ChatMessage(role="user", content=prompt)
  ])
  return response
