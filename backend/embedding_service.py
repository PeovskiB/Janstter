import openai
from tenacity import retry, wait_random_exponential, stop_after_attempt, retry_if_not_exception_type
from openai import OpenAI
import os
from dotenv import load_dotenv
import tiktoken
from itertools import islice
import numpy as np
from transformers import AutoModel
import torch

model = AutoModel.from_pretrained('jinaai/jina-embeddings-v2-base-en', trust_remote_code=True) # trust_remote_code is needed to use the encode method

def get_text_embedding(text):
    return model.encode(text)

