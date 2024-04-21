import json
import requests
import os

def get_query_from_user(prompt):
  stream = False
  url = "https://proxy.tune.app/chat/completions"
  headers = {
      "Authorization": os.environ.get("TUNE_API_KEY"),
      "Content-Type": "application/json",
  }
  rag=open('../data/data.txt', 'r').read()
  data = {
    "temperature": 0.8,
      "messages":  [
    {
      "role": "system",
      "content": "Welcome to Synergy AI! "
    },
    {
      "role": "user",
      "content": rag
    },
    {
      "role": "user",
      "content": prompt  
    },
    {
      "role": "assistant"
      
    },
  
  ],
      "model": "rohan/mixtral-8x7b-inst-v0-1-32k",
      "stream": stream,
      "penalty":  0,
      "max_tokens": 900
  }
  response = requests.post(url, headers=headers, json=data)
  
  if response.status_code == 200:
    json_response = response.json()
    # Access the assistant's response content directly
    answer = json_response['choices'][0]['message']['content']
    return answer
  else:
    print(f"Error: {response.status_code}")
    return "Cannot generate response at the moment. Please try again later."