
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


import embedding_service, prediction_service, repo

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


@app.post("/initdb")
async def say_hello(data: dict):
    pswrd = data.get("password")
    if pswrd == "admin":
        msg = repo.init_db()
        if msg is not None:
            return {"message": msg}
    return {"message": f"Wrong password"}


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
async def get_simmilar(data: dict):
    text = data.get("text")
    if text is None:
        raise HTTPException(status_code=400, detail="Missing 'text' field in request JSON")

    embedding = embedding_service.get_text_embedding(text)
    most_similar = repo.get_most_similar(embedding)

    return {"court_cases": most_similar}
