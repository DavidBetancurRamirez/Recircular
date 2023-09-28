from fastapi import APIRouter, HTTPException, Depends
from config.db import conn, session
from models.user import users as user_table
from schemas.user import User, LogIn
from datetime import datetime
from sqlalchemy import select, text
from cryptography.fernet import Fernet, InvalidToken # Módulo para encriptar contraseña
from typing import List

key = Fernet.generate_key()
f = Fernet(key)

user = APIRouter()

user_columns = user_table.columns.keys()

@user.get(
    "/users",
    tags=["users"],
    response_model=List[User],
    description="Get a list of all users",
)
def get_users():
    return conn.execute(user_table.select()).fetchall()


# Retorna Usuario
@user.get(
    "/users/{id}",
    tags=["users"],
    response_model=User,
    description="Get a single user by Id",
)
def get_user(id: str):
    return conn.execute(user_table.select().where(user_table.c.id == id)).first()


# Sign_Up
@user.post("/SignUp", tags=["users"], description="Create a new user")
def sign_up(u: User):
    try:
        encripted_password = f.encrypt(u.password.encode("utf-8"))   
        consulta = text('INSERT INTO user VALUES (null, :username, :email, :password, null, null, :date_created, null);')
        valores = {"username": u.username, "email": u.email, "password": encripted_password, "date_created": datetime.now()}
        session.execute(consulta, valores)
        session.commit()
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'
    finally:
        session.close()


#  "username": "tomas",
#   "email": "tomas@gmail.com",
#   "password": "contrasena1",

# Log_In
@user.post("/LogIn", tags=["users"], description="Login")
def log_in(username: str, password: str):
    try:
        consulta = text('SELECT id FROM user WHERE user.username = :username')
        user_id = session.execute(consulta, {'username': username}).scalar()
        if user_id:
            consulta = text('SELECT password FROM user WHERE user.username = :username')
            user_password = session.execute(consulta, {'username': username}).scalar()
            if f.decrypt(user_password).decode("utf-8") == password:
                return {"message": "Login successful"}
        return {"message": "Login unsuccessful"}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message": "Login unsuccessful"}
    # user_id, flag = query_user_from_db(username)
    # user_data = (
    #     session.query(user_table)
    #     .filter(user_table.username == username)
    #     .filter(f.decrypt(user_table.password).decode("utf-8") == password)
    # )
    # user_data = conn.execute(users.select().where(users.c.username == username)).fetchone()
    # stored_password = user_data['password']
    
    # if flag: # and f.decrypt(stored_password).decode("utf-8") == password:
    #     return user_id
    # else:
    #     return 'Invalid password'

# def query_user_from_db(username):
#     conexion = Connection.database_connection()
#     cursor = conexion.cursor(buffered=True)
#     sql = 'SELECT id FROM user WHERE username = %s;'
#     cursor.execute(sql, (username))
#     user_data = cursor.fetchone()
#     if user_data:
#         user_id = user_data[0]  # Extraer el ID del resultado
#         conexion.commit()
#         conexion.close()
#         return user_id, True
#     else:
#         conexion.close()
#         return None, False
        

# Update_Profile
@user.put(
    "/users/{id}", tags=["users"], description="Update a User by Id"
)
def update_user(u: User, id: str):
    try:
        encripted_password = f.encrypt(u.password.encode("utf-8"))   
        consulta = text('UPDATE user SET user.username = :username, user.email = :email, user.password = :password, user.phone = :phone, user.date_updated = :date_updated WHERE user.id = :id;')
        valores = {"username": u.username, "email": u.email, "password": encripted_password, "phone": u.phone, "date_updated": datetime.now(), "id": id}
        session.execute(consulta, valores)
        session.commit()
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'

