
from transformers import AutoModel
import torch

model = AutoModel.from_pretrained('jinaai/jina-embeddings-v2-base-en', trust_remote_code=True) # trust_remote_code is needed to use the encode method

def get_text_embedding(text):
    return model.encode(text)

