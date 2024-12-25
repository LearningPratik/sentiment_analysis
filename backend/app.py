import joblib
from fastapi import FastAPI, Form
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import Annotated
import requests

from pydantic import BaseModel
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

# declare origin/s
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    movieName: str

loaded_vectorizer = joblib.load('models/tfidf_vectorizer.joblib')
loaded_model = joblib.load('models/svm_classifier.joblib')

@app.get('/')
def hello():
    return 'hello world'

@app.post('/classification')
def bye(sentence: Annotated[str, Form()]):

    pred = ''
    
    sent = str(sentence)
    vector = loaded_vectorizer.transform([sent])
    loaded_model_pred = loaded_model.predict(vector)

    # ['3 Positive', '1 Negative', '0 Irrelvant', '2 Neutral']

    if loaded_model_pred[0] == 0:
        pred += 'Irrelevant'
    elif loaded_model_pred[0] == 1:
        pred += 'Negative'
    elif loaded_model_pred[0] == 2:
        pred += 'Neutral'
    else:
        pred += 'Positive'

    return f'Given sentence is {pred}'