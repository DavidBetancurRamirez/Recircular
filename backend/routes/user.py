from fastapi import APIRouter
from config.db import conn
from models.user import users
from schemas.user import User, LogIn
from config.Connection import *
from datetime import datetime
from sqlalchemy import select
from cryptography.fernet import Fernet # Módulo para encriptar contraseña
from typing import List
from sqlalchemy.orm import Session

key = Fernet.generate_key()
f = Fernet(key)

user = APIRouter()

@user.get(
    "/users",
    tags=["users"],
    response_model=List[User],
    description="Get a list of all users",
)
def get_users():
    return conn.execute(users.select()).fetchall()


# Retorna Usuario
@user.get(
    "/users/{id}",
    tags=["users"],
    response_model=User,
    description="Get a single user by Id",
)
def get_user(id: str):
    return conn.execute(users.select().where(users.c.id == id)).first()


# Sign_In
@user.post("/SignIn", tags=["users"], response_model=User, description="Create a new user")
def sign_in(u: User):
    try:
        new_user = {"username": u.username, "email": u.email, "date_created": datetime.now()}
        new_user["password"] = f.encrypt(u.password.encode("utf-8"))
        conn.execute(users.insert().values(new_user))
        conn.commit()
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'

# Log_In
@user.post("/LogIn", tags=["users"], response_model=User, description="Login")
def log_in(u: LogIn):
    username = u.username
    password = u.password
    
    user_id, flag = query_user_from_db(username)
    # user_data = conn.execute(users.select().where(users.c.username == username)).fetchone()
    # stored_password = user_data['password']
    
    if flag: # and f.decrypt(stored_password).decode("utf-8") == password:
        return user_id
    else:
        return 'Invalid password'

def query_user_from_db(username):
    conexion = Connection.database_connection()
    cursor = conexion.cursor(buffered=True)
    sql = 'SELECT id FROM user WHERE username = %s;'
    cursor.execute(sql, (username))
    user_data = cursor.fetchone()
    if user_data:
        user_id = user_data[0]  # Extraer el ID del resultado
        conexion.commit()
        conexion.close()
        return user_id, True
    else:
        conexion.close()
        return None, False
        

# Update_Profile
@user.put(
    "users/{id}", tags=["users"], response_model=User, description="Update a User by Id"
)
def update_user(u: User, id: int):
    try:
        conn.execute(
            users.update()
            .values(username=u.username, 
                    email=u.email, 
                    password=f.encrypt(u.password.encode('utf-8')), 
                    phone=u.phone, 
                    shippingaddress=u.ShippingAddress_id, 
                    date_updated=datetime.now()).where(users.c.id == id)
        )
        conn.commit()
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'

    
    