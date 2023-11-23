import random

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncio

import embedding_service, prediction_service

app = FastAPI()

# Allow all origins for development purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/")
async def root(data: dict):
    text = data.get("text")
    if text is None:
        raise HTTPException(status_code=400, detail="Missing 'text' field in request JSON")

    embedding = embedding_service.get_text_embedding(text)
    prob = prediction_service.get_prediction(embedding)
    prob = float(prob)
    pred = "Violation" if prob > 0.5 else "Non-Violation"
    return {
        "prediction": pred,
        "chance": prob
    }


@app.post("/findSimmilar")
async def get_simmilar():
    await asyncio.sleep(0.2)
    court_cases = [
        {
            "title": "Case 1: Smith v. State",
            "violation": True,
            "link": "https://hudoc.echr.coe.int/eng#{%22itemid%22:[%22001-228837%22]}"
        },
        {
            "title": "Case 2: Jones v. City",
            "violation": False,
            "link": "https://hudoc.echr.coe.int/eng#{%22itemid%22:[%22001-228838%22]}"
        },
        {
            "title": "Case 3: Johnson v. Federal Government",
            "violation": True,
            "link": "https://hudoc.echr.coe.int/eng#{%22itemid%22:[%22001-228839%22]}"
        },
        {
            "title": "Case 4: Davis v. Municipality",
            "violation": False,
            "link": "https://hudoc.echr.coe.int/eng#{%22itemid%22:[%22001-228840%22]}"
        }
    ]

    return {"court_cases": court_cases}
