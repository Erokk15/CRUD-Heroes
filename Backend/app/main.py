from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.hero import hero 

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://example.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hero)

@app.get("/")
def read_root():
    return {"message": "Hello World"}