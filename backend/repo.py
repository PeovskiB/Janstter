from qdrant_client import QdrantClient
from qdrant_client import models
import pandas as pd

client = QdrantClient(host="localhost", port=6333)

col_name = "cases"

def init_db():
    df = pd.read_csv('db.csv')

    index = list(range(len(df)))
    #vecs = df['Embedding'].tolist()
    #vecs = df['Embedding'].apply(lambda x: [float(v) for v in x.strip('[]').split(',')] if isinstance(x, str) else x).tolist()
    vecs = [list(map(float, v.strip('[]').split())) for v in df['Embedding']]
    payload = [{'link': link, 'outcome': label, 'itemid': itemid, 'violations': violations, 'non_violations': non_violations} for link, label, itemid, violations, non_violations in zip(df['Page Link'], df['label'], df['itemid'], df['Violations'], df['Non-Violations'])]

    print(client.get_collections().collections)
    if len(client.get_collections().collections) > 0:
        return "Database has already been initialized"
    client.create_collection(
        collection_name=col_name,
        vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE)
    )
    client.upsert(
        collection_name=col_name,
        points=models.Batch(
            ids=index,
            vectors=vecs,
            payloads=payload
        )
    )
    return "Database init successful"

def get_most_similar(embed, limit=3):
    result = client.search(
        collection_name=col_name,
        query_vector=embed,
        limit=limit
    )

    court_cases = []

    for scored_point in result:
        link = scored_point.payload.get('link', '')
        case_id = scored_point.payload.get('itemid', '')
        outcome = scored_point.payload.get('outcome', None)

        # Adjust the logic to determine the violation based on the 'outcome' value
        violation = True if outcome == 1 else False if outcome == 0 else None

        violations = scored_point.payload.get('violations', '')
        non_violations = scored_point.payload.get('non_violations', '')
        court_case = {
            "title": f"Case {case_id}",
            "has_violation": violation,
            "link": link,
            "violations": violations,
            "non_violations": non_violations
        }

        court_cases.append(court_case)

    return court_cases
