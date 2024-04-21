import json
import requests
import os
from llama_index.llms.solar import Solar
from llama_index.core.llms import ChatMessage

def get_query_from_user(prompt): 
  llm = Solar(api_key=os.environ["SOLAR_API_KEY"], is_chat_model=True)

  response = llm.chat(messages=[
    ChatMessage(role="system", content="You are a helpful assistant."),
    ChatMessage(role="user", content=prompt)
  ])
  return response
