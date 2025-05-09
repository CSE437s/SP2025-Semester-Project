from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime
from dotenv import load_dotenv
import asyncio
import os
import json

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SKI_WEATHER_API_KEY = os.getenv("SKI_WEATHER_API_KEY") #a38c8d1d96304461b7d170052251803
BASE_URL = "https://api.worldweatheronline.com/premium/v1/ski.ashx"

async def get_weather(city: str, num_days: int = 1):
    """
    Returns weather for the given dates. By default, returns weather for the next 1 day.
    """
    params = {
        "key": SKI_WEATHER_API_KEY,
        "q": city,
        "format": "json",
        "num_of_days": num_days
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_URL, params=params)
        return response.json()


def get_snowfall(res):
    """
    Parse from weather API response into a more usable format.
    {
        'date': "2025-03-18",
        'snowfall_chance': '82',
        'snowfall_total': '10.8',
        'astronomy': [...]
    }
    """
    data = {
        "date": res["data"]["weather"][0]["date"],
        "astronomy": res["data"]["weather"][0]["astronomy"],
        "snowfall_chance": res["data"]["weather"][0]["chanceofsnow"],
        "snowfall_total": res["data"]["weather"][0]["totalSnowfall_cm"],
        "temperature": {
            "bottom": {
                "max_c": res["data"]["weather"][0]["bottom"][0]["maxtempC"],
                "min_c": res["data"]["weather"][0]["bottom"][0]["mintempC"],
                "max_f": res["data"]["weather"][0]["bottom"][0]["maxtempF"],
                "min_f": res["data"]["weather"][0]["bottom"][0]["mintempF"]
            },
            "mid": {
                "max_c": res["data"]["weather"][0]["mid"][0]["maxtempC"],
                "min_c": res["data"]["weather"][0]["mid"][0]["mintempC"],
                "max_f": res["data"]["weather"][0]["mid"][0]["maxtempF"],
                "min_f": res["data"]["weather"][0]["mid"][0]["mintempF"]
            },
            "top": {
                "max_c": res["data"]["weather"][0]["top"][0]["maxtempC"],
                "min_c": res["data"]["weather"][0]["top"][0]["mintempC"],
                "max_f": res["data"]["weather"][0]["top"][0]["maxtempF"],
                "min_f": res["data"]["weather"][0]["top"][0]["mintempF"]
            }
        }
    }
    return data

@app.get("/weather")
async def retrieve_weather(city: str):
    try:
        weather = await get_weather(city)
        snow = get_snowfall(weather)
        return snow
    except Exception as e:
        return {"error": str(e)}
    

async def main():
    weather = await retrieve_weather("Mt Baker, WA")
    print(weather)

if __name__ == "__main__":
    asyncio.run(main())