from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["stock_dashboard"]

@app.get("/")
def read_root():
    return {"message": "Welcome to the Stock Dashboard API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
