import urllib.request
import json
import traceback

url = "http://localhost:8000/chat/cached"
headers = {"Content-Type": "application/json"}
data = json.dumps({"message": "hi there", "history": []}).encode("utf-8")

req = urllib.request.Request(url, data=data, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print(f"Body: {response.read().decode()}")
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(f"Body: {e.read().decode()}")
except Exception as e:
    print(f"Error: {e}")
