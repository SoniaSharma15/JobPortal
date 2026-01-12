from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

OLLAMA_EMBED_URL = "http://localhost:11434/api/embeddings"
MODEL = "nomic-embed-text"


class TextInput(BaseModel):
    text: str


@app.post("/embed")
def embed_text(data: TextInput):
    response = requests.post(
        OLLAMA_EMBED_URL,
        json={
            "model": MODEL,
            "prompt": data.text
        }
    )

    result = response.json()

    # Ollama returns embeddings in this format
    return {
        "embedding": result["embedding"]
    }
