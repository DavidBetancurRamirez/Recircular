from fastapi import APIRouter, HTTPException, Depends
from config.db import conn, session
from models.user import users as user_table
from schemas.user import User, ShippingAddress, Product, URL, Material
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


# Mostrar un Usuario
@user.get(
    "/users/{username}",
    tags=["users"],
    description="Get a single user by Username",
)
def get_user(username: str):
    try:
        consulta = text("SELECT * FROM user WHERE user.username = :username")
        user_return = session.execute(consulta, {"username" : username}).first()
        if user_return is not None:
            return user_return._asdict()
        else:
            return None
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
        
        consulta = text("SELECT * FROM user WHERE user.id = :id")
        return session.execute(consulta, {"id" : new_id}).first()._asdict()
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()


''' 
    "username": "Tomaslopera10",
    "email": "loperatomas410@gmail.com",
    "password": "Contraseña-123",
    "username": "tomas",
    "email": "tomas@gmail.com",
    "password": "Contrasena-1",
'''

# Inicio de Sesión
@user.post("/login", tags=["users"], description="Login")
def log_in(u : User):
    try:
        consulta = text('SELECT id FROM user WHERE user.username = :username')
        user_id = session.execute(consulta, {'username': u.username}).scalar()
        if user_id:
            consulta = text('SELECT password FROM user WHERE user.username = :username')
            stored_password = session.execute(consulta, {'username': u.username}).scalar()
            if pwd_context.verify(u.password, stored_password):
                consulta = text("SELECT * FROM user WHERE user.id = :id")
                return session.execute(consulta, {"id" : user_id}).first()._asdict()
        return None
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
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
        return {"message": "Completed"}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message": "Non Completed"}
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


# Agregar dirección de envío
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
        
        
# Modificar Dirección de Envío
@user.put("/users/shippingaddress/{id}", tags=["users"])
def update_shipping_address(id: str, s: ShippingAddress):
    try:
        consulta_id = text("SELECT ShippingAddress_id FROM user WHERE user.id = :id")
        new_id = session.execute(consulta_id, {"id" : id}).first()[0]
        
        consulta = text("UPDATE shipping_address SET shipping_address.country = :country, shipping_address.city = :city, shipping_address.province = :province, shipping_address.address = :address, shipping_address.description = :description, shipping_address.postal_code = :postal_code WHERE shipping_address.id = :new_id")
        valores = {"country": s.country, "city": s.city, "province": s.province, "address": s.address, "description" : s.description, "postal_code" : s.postal_code, "new_id" : new_id}
        
        session.execute(consulta, valores)
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
        consulta = text('INSERT INTO product VALUES (:id, :user_id, :name, :description, :characteristics, :status, :date_created);')
        valores = {"id": new_id, "user_id": id, "name": p.name, "description": p.description, "characteristics": p.characteristics, "status": True, "date_created": datetime.now()}
        session.execute(consulta, valores)
        
        print(p.urls)
        
        for url in p.urls:
            url_id = str(uuid.uuid4())
            consulta_url = text('INSERT INTO url (id, product_id, url) VALUES (:id, :product_id, :url);')
            valores_url = {"id": url_id, "product_id": new_id, "url": url}
            session.execute(consulta_url, valores_url)
            
        for material in p.materials:
            material_id = str(uuid.uuid4())
            consulta_material = text('INSERT INTO material (id, product_id, material) VALUES (:id, :product_id, :material);')
            valores_material = {"id": material_id, "product_id": new_id, "material": material}
            session.execute(consulta_material, valores_material)
        
        session.commit()
        return {"message": "Product Created", "uuid": new_id}
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return {"message" : "Product not created"}
        

'''
     {
  "name": "Aserrin",
  "description": "Somos una empresa que trabaja con madera y nos sobra gran cantidad de aserrín de nuestra producción",
  "characteristics": "Características\n - Varios tipos de madera\n- 100% madera seca\n- Textura lisa",
  "urls": [
    "https://www.youtube.com/watch?v=iDZA-cps21o&ab_channel=DataCamp", "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
  ],
  "materials": [
    "Acero", "Algodon", "Aluminio", "Arcilla"
  ],
  "status": true,
  "date_created": "2023-10-22T14:18:01.403Z"
}
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
        
        # consulta = text("SELECT p.*, m.material, u.url FROM product p LEFT JOIN material m ON p.id = m.product_id LEFT JOIN url u ON p.id = u.product_id WHERE p.user_id = :user_id")
        consulta = text("SELECT * FROM product WHERE product.user_id = :user_id")
        results = session.execute(consulta, {"user_id" : id}).fetchall()
        
        products = {}
        for row in results:
            product_id = row[0]
            consulta_materials = text("SELECT * FROM material WHERE material.product_id = :product_id")
            results_material = session.execute(consulta_materials, {"product_id" : product_id}).fetchall()
            
            consulta_urls = text("SELECT * FROM url WHERE url.product_id = :product_id")
            results_urls = session.execute(consulta_urls, {"product_id" : product_id}).fetchall()
            
            print(results_material)
            print(results_urls)
            
            if product_id not in products:
                products[product_id] = {
                    "id": row[0],
                    "user_id": row[1],
                    "name": row[2],
                    "description": row[3],
                    "characteristics": row[4],
                    "status": row[5],
                    "date_created": row[6],
                    "material": [],
                    "url": []
                }
            for row in results_material:
                material_id = row[0]
                products[product_id]["material"]
            for row in results_urls:
                url_id = row[0]
                products[product_id]["url"] = row[2]
        
        return list(products.values())
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
    finally:
        session.close()
        

# Mostrar producto
@user.get(
    "/product/{id}",
    tags=["products"],
    description="Get one Product"
)
def get_product(id: str):
    try:
        consulta = text("SELECT * FROM product WHERE product.id = :id;")
        results = session.execute(consulta, {"id" : id}).fetchall()
        
        print(results)
        
        return results
    # Si retorno este arreglo no lanza problema
        # return [Product(
        #         id=row[0], 
        #         user_id=row[1], 
        #         name=row[2], 
        #         description=row[3], 
        #         price=row[4], 
        #         stock=row[5], 
        #         date_created=row[6]
        #     ) for row in results]
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
    finally:
        session.close()
        return 'Non Completed'
        