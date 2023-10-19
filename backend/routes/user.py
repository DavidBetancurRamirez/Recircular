from fastapi import APIRouter, HTTPException, Depends
from config.db import conn, session
from models.user import users as user_table
from schemas.user import User, ShippingAddress, Product
from datetime import datetime
from sqlalchemy import select, text
from passlib.context import CryptContext
from typing import List
import bcrypt
import uuid

user = APIRouter()

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto") 


# Mostrar todos los Usuarios
@user.get(
    "/users",
    tags=["users"],
    response_model=List[User],
    description="Get a list of all users",
)
def get_users():
    return conn.execute(user_table.select()).fetchall()


# Mostrar un Usuario (Arreglar Internal Server Error)
@user.get(
    "/users/{username}",
    tags=["users"],
    response_model=User,
    description="Get a single user by Username",
)
def get_user(username: str):
    try:
        consulta = text("SELECT * FROM user WHERE user.username = :username")
        user_return = session.execute(consulta, {"username" : username}).first()
        return user_return
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")



# Registro de Usuario
@user.post("/signup", tags=["users"], description="Create a new user")
def sign_up(u: User):
    try:
        new_id = str(uuid.uuid4())
        encripted_password = pwd_context.hash(u.password)
        consulta = text('INSERT INTO user VALUES (:uuid, :username, :email, :password, null, null, :date_created, :date_updated);')
        valores = {"uuid": new_id, "username": u.username, "email": u.email, "password": encripted_password, "date_created": datetime.now(), "date_updated" : datetime.now()}
        session.execute(consulta, valores)
        session.commit()
        return {"message": "SignUp successful", "uuid": new_id}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message": "SignUp unsuccessful"} 
    finally:
        session.close()


''' 
    "username": "Tomaslopera10",
    "email": "loperatomas410@gmail.com",
    "password": "Contraseña-123",
'''

# Inicio de Sesión
@user.post("/login", tags=["users"], description="Login")
def log_in(username: str, password: str):
    try:
        consulta = text('SELECT id FROM user WHERE user.username = :username')
        user_id = session.execute(consulta, {'username': username}).scalar()
        if user_id:
            consulta = text('SELECT password FROM user WHERE user.username = :username')
            stored_password = session.execute(consulta, {'username': username}).scalar()
            print(stored_password)
            if pwd_context.verify(password, stored_password):
                return {"message": "Login successful", "uuid": user_id}
        return {"message": "Login unsuccessful"}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message": "Login unsuccessful"} 
    finally:
        session.close()      


# Modificación del perfil
@user.put(
    "/users/{id}", tags=["users"], description="Update a User by Id"
)
def update_user(u: User, id: str):
    try:
        consulta = text('UPDATE user SET user.username = :username, user.email = :email, user.phone = :phone, user.date_updated = :date_updated WHERE user.id = :id;')
        valores = {"username": u.username, "email": u.email, "phone": u.phone, "date_updated": datetime.now(), "id": id}
        session.execute(consulta, valores)
        session.commit()
        return 'Completed'
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return 'Non Completed'
    finally:
        session.close()  

'''
   "country": "Colombia",
   "city": "Medellin",
   "province": "Antioquia",
   "address": "Carrera 45a #80sur 75",
   "description": "Urbanización Prestige, Apto. 803",
   "postal_code": "044550"
'''


# Agregar dirección de envío (Clave foraneas)
@user.post(
    "/users/shippingaddress", tags=["users"], description="Add a Shipping Address"
)
def add_shipping_address(id: str, s: ShippingAddress):
    try:
        consulta = text('INSERT INTO shipping_address VALUES (null, :country, :city, :province, :address, :description, :postal_code);')
        valores = {"country": s.country, "city": s.city, "province": s.province, "address": s.address, "description" : s.description, "postal_code" : s.postal_code}
        session.execute(consulta, valores)
        session.commit()
        
        id_sa = session.execute(text("SELECT id FROM shipping_address WHERE shipping_address.address = :address ORDER BY id DESC"), {"address" : s.address}).first()[0]
        
        consulta_usuario = text("UPDATE user SET user.ShippingAddress_id = :ShippingAddress_id WHERE user.id = :id;")
        valores_usuario = {"ShippingAddress_id" : int(id_sa), "id" : id}
        session.execute(consulta_usuario, valores_usuario)
        session.commit()
        
        return {"message" : "Completed"}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message" : "Non Completed"}
    finally:
        session.close()
        

# Agregar Producto
@user.post(
    "/users/create_product", tags=["users"], description="Add a Product"
)
def add_product(id: str, p: Product):
    try:
        new_id = str(uuid.uuid4())
        consulta = text('INSERT INTO product VALUES (:id, :user_id, :name, :description, :price, :stock, :date_created);')
        valores = {"id": new_id, "user_id": id, "name": p.name, "description": p.description, "price": p.price, "stock": p.stock, "date_created": datetime.now()}
        session.execute(consulta, valores)
        session.commit()
        return {"message": "Product Created", "uuid": new_id}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message" : "Product not created"}
        
'''
    "name": "Aserrin",
    "description": "Conjunto de partículas que se desprenden de la madera cuando se sierra",
    "price": 30000,
    "stock": 50,
    "date_created": "2023-10-18T21:12:01.461Z"
'''

# Mostrar productos del usuario
@user.get(
    "/users/{username}/products",
    tags=["users", "products"],
    description="Get all Products form the User"
)
def get_products_user(username: str):
    try:
        consulta_id = text("SELECT id FROM user WHERE user.username = :username")
        id = session.execute(consulta_id, {"username" : username}).first()[0]
        consulta = text("SELECT * FROM product WHERE product.user_id = :user_id")
        results = session.execute(consulta, {"user_id" : id}).fetchall()
        
        return [Product(
                id=row[0], 
                user_id=row[1], 
                name=row[2], 
                description=row[3], 
                price=row[4], 
                stock=row[5], 
                date_created=row[6]
            ) for row in results]
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
    finally:
        session.close()
        

# Mostrar producto
@user.get(
    "/product/{id}",
    tags=["product"],
    description="Get one Product"
)
def get_product(id: str):
    consulta = text("SELECT * FROM product WHERE product.id = :id;")
    return session.execute(consulta, {"id" : id})

