from fastapi import APIRouter, HTTPException, Depends
from config.db import conn, session
from models.user import users as user_table
from schemas.user import User, ShippingAddress
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
    "/users/{username}",
    tags=["users"],
    response_model=User,
    description="Get a single user by Id",
)
def get_user(username: str):
    return conn.execute(user_table.select().where(user_table.c.username == username)).first()


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


''' 
    "username": "tomas",
    "email": "tomas@gmail.com",
    "password": "contrasena1",
'''

# Log_In
@user.post("/LogIn", tags=["users"], description="Login")
def log_in(username: str, password: str):
    try:
        consulta = text('SELECT id FROM user WHERE user.username = :username')
        user_id = session.execute(consulta, {'username': username}).scalar()
        if user_id:
            consulta = text('SELECT password FROM user WHERE user.username = :username')
            stored_password = session.execute(consulta, {'username': username}).scalar()
            print(stored_password)
            if f.decrypt(stored_password).decode("utf-8") == password:
                return {"message": "Login successful"}
        return {"message": "Login unsuccessful"}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message": "Login unsuccessful"}       


# Update_Profile
@user.put(
    "/users/{id}", tags=["users"], description="Update a User by Id"
)
def update_user(u: User, id: int):
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


'''
   "country": "Colombia",
   "city": "Medellin",
   "province": "Antioquia",
   "address": "Carrera 45a #80sur 75",
   "description": "Urbanización Prestige, Apto. 803",
   "postal_code": "044550"
'''

@user.post(
    "/users/ShippingAddress", tags=["users"], description="Add a Shipping Address"
)
def add_shipping_address(id: int, s: ShippingAddress):
    try:
        consulta = text('INSERT INTO shipping_address VALUES (null, :country, :city, :province, :address, :description, :postal_code)')
        valores = {"country": s.country, "city": s.city, "province":s.province, "address": s.address, "description" : s.description, "postal_code" : s.postal_code}
        session.execute(consulta, valores)
        
        # id_shipping_address = session.execute(text("SELECT last_insert_rowid()"))[0]
        
        # consulta_usuario = text("UPDATE user SET user.ShippingAddress_id = :ShippingAddress_id WHERE user.id = :id;")
        # valores_usuario = {"ShippingAddress_id" : id_shipping_address, "id" : id}
        # session.execute(consulta_usuario, valores_usuario)
        # session.commit()
        
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'
        