import http.client
import json

conn = http.client.HTTPConnection("localhost", 8000)
headers = {"Content-Type": "application/json"}
payload = {"message": "hi", "history": []}

try:
    conn.request("POST", "/chat", json.dumps(payload), headers)
    response = conn.getresponse()
    print(f"Status: {response.status}")
    print(f"Body: {response.read().decode()}")
except Exception as e:
    print(f"Error: {e}")
