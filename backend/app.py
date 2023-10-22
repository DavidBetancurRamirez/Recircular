from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import user

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Si tu aplicación utiliza credenciales (cookies, autenticación)
    allow_methods=["*"],     # Permitir cualquier método
    allow_headers=["*"]      # Permitir cualquier header
)

# @app.options("/{path:path}")
# async def options_route(path: str):
#     return {}

app.include_router(user)