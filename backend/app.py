from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins
)

app.include_router(user)