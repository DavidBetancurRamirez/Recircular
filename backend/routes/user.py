from fastapi import APIRouter, HTTPException, Depends
from fastapi import File, UploadFile, Form
from config.db import conn, session
from models.user import users as user_table
from schemas.user import User, ShippingAddress, Product, Change
from datetime import datetime
from sqlalchemy import select, text
from passlib.context import CryptContext
from typing import List
from azure.storage.blob import BlobServiceClient
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
    "/users/{id}",
    tags=["users"],
    description="Get a single user by Username",
)
def get_user(id: str):
    try:
        consulta = text("SELECT username FROM user WHERE user.id = :id")
        user_return = session.execute(consulta, {"id" : id}).fetchone()[0]
        if user_return is not None:
            return user_return
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
        
        consulta = text('INSERT INTO user VALUES (:uuid, :username, :email, :password, null, null, null,:status, :date_created, :date_updated);')
        valores = {"uuid": new_id, "username": u.username, "email": u.email, "password": encripted_password, "status" : True, "date_created": datetime.now(), "date_updated" : datetime.now()}
        
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
            consulta = text('SELECT status FROM user WHERE user.username = :username')
            status = session.execute(consulta, {'username': u.username}).scalar()
            if status:
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
    "/update_profile", tags=["users"], description="Update a User by Id"
)
def update_user(u: User):
    try:
        print(u.id)
        consulta = text('UPDATE user SET user.username = :username, user.phone = :phone, user.date_updated = :date_updated, user.address = :address WHERE user.id = :id;')
        valores = {"username": u.username, "phone": u.phone, "date_updated": datetime.now(), "address" : u.address, "id": u.id}
        session.execute(consulta, valores)
        session.commit()
        
        consulta = text("SELECT * FROM user WHERE user.id = :id")
        return session.execute(consulta, {"id" : u.id}).first()._asdict()
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
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


# Eliminar Usuario
@user.put(
    "/delete/{id}", tags=["users"]
)
def delete_user(id: str):
    try:
        consulta = text("UPDATE user SET user.status = :status WHERE user.id = :id")
        session.execute(consulta, {"status" : False, "id" : id})
        session.commit()
        
        return True
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()
        

# Cambio de Contraseña
@user.put("/change_password", tags=["users"], description="Login")
def change_password(c : Change):
    try:
        print(c.old_password)
        print(c.new_password)
        consulta = text('SELECT id FROM user WHERE user.email = :email')
        user_id = session.execute(consulta, {"email": c.email}).scalar()
        if user_id:
            consulta = text('SELECT password FROM user WHERE user.email = :email')
            stored_password = session.execute(consulta, {'email': c.email}).scalar()
            if pwd_context.verify(c.old_password, stored_password):
                consulta = text("UPDATE user SET user.password = :new_password WHERE user.id = :id")
                session.execute(consulta, {"new_password" : pwd_context.hash(c.new_password), "id" : user_id})
                session.commit()
                consulta = text("SELECT * FROM user WHERE user.id = :id")
                return session.execute(consulta, {"id" : user_id}).first()._asdict()    
        return None
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()


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
    "/add_product", tags=["users"], description="Add a Product"
)
def add_product(p: Product):
    try:
        new_id = str(uuid.uuid4())
        
        consulta = text('INSERT INTO product VALUES (:id, :user_id, :name, :description, :status, :date_created);')
        valores = {"id": new_id, "user_id": p.user_id, "name": p.name, "description": p.description, "status": True, "date_created": datetime.now()}
        session.execute(consulta, valores)
        
        for img in p.images:
            image_id = str(uuid.uuid4())
            consulta_image = text('INSERT INTO image (id, product_id, image) VALUES (:id, :product_id, :image);')
            valores_image = {"id": image_id, "product_id": new_id, "image": img}
            session.execute(consulta_image, valores_image)
            
        for material in p.materials:
            material_id = str(uuid.uuid4())
            consulta_material = text('INSERT INTO material (id, product_id, material) VALUES (:id, :product_id, :material);')
            valores_material = {"id": material_id, "product_id": new_id, "material": material}
            session.execute(consulta_material, valores_material)
        
        for charact in p.characteristics:
            charac_id = str(uuid.uuid4())
            consulta_characteristic = text('INSERT INTO characteristic (id, product_id, characteristic) VALUES (:id, :product_id, :characteristic);')
            valores_characteristic = {"id": charac_id, "product_id": new_id, "characteristic": charact}
            session.execute(consulta_characteristic, valores_characteristic)
        
        session.commit()
        return get_product(new_id)
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
        

'''
     {
  "name": "Aserrin",
  "description": "Somos una empresa que trabaja con madera y nos sobra gran cantidad de aserrín de nuestra producción",
  "characteristics": ["Varios tipos de madera", "100% madera seca", "Textura lisa"],
  "images": [
    "https://www.youtube.com/watch?v=iDZA-cps21o&ab_channel=DataCamp", "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
  ],
  "materials": [
    "Acero", "Algodon", "Aluminio", "Arcilla"
  ],
  "status": true,
  "date_created": "2023-10-22T14:18:01.403Z"
}
'''

# Mostrar producto
@user.get(
    "/product/{id}",
    tags=["products"],
    description="Get one Product"
)
def get_product(id: str):
    try:
        consulta = text('SELECT * FROM product WHERE id = :id;')
        valores = {"id": id}
        result = session.execute(consulta, valores).fetchone()
        
        consulta_usuario = text("SELECT username FROM user WHERE user.id = :id")
        user_id = session.execute(consulta_usuario, {"id" : result[1]}).fetchone()[0]

        consulta_usuario = text("SELECT email FROM user WHERE user.id = :id")
        user_email = session.execute(consulta_usuario, {"id" : result[1]}).fetchone()[0]
        
        consulta_usuario = text("SELECT phone FROM user WHERE user.id = :id")
        user_phone = session.execute(consulta_usuario, {"id" : result[1]}).fetchone()[0]

        if result and user_id:
            product = {
                "id": result[0],
                "user_id": user_id,
                "user_email": user_email,
                "user_phone": user_phone,
                "name": result[2],
                "description": result[3],
                "status": result[4],
                "date_created": result[5],
            }

            consulta_images = text('SELECT * FROM image WHERE product_id = :product_id;')
            valores_images = {"product_id": id}
            images = [row.image for row in session.execute(consulta_images, valores_images)]

            consulta_materials = text('SELECT * FROM material WHERE product_id = :product_id;')
            valores_materials = {"product_id": id}
            materials = [row.material for row in session.execute(consulta_materials, valores_materials)]

            consulta_characteristics = text('SELECT * FROM characteristic WHERE product_id = :product_id;')
            valores_characteristics = {"product_id": id}
            characteristics = [row.characteristic for row in session.execute(consulta_characteristics, valores_characteristics)]

            product["images"] = images
            product["materials"] = materials
            product["characteristics"] = characteristics

            return product
        else:
            return None
    except Exception as e:
        print(f"Error al buscar el producto en la base de datos: {e}")
        return None
           

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
        
        if results:
            products = {}
            i = 0
            for row in results:
                products[i] = get_product(row[0])
                i += 1    
            
            return list(products.values())
        else:
            return None
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()


# Mostrar todos los productos (Página principal)
@user.get("/products", 
        tags=["products"],
        description="Get all products")
def get_products():
    try:
        consulta = text("SELECT * FROM product;")
        results = session.execute(consulta, None).fetchall()
        
        if results:
            products = {}
            i = 0
            for row in results:
                products[i] = get_product(row[0])
                i += 1    
            
            return list(products.values())
        else:
            return None
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()


# Búsqueda de productos (Usando el buscador)
@user.get(
    "/search/products/{key_word}",
    tags=["products"],
    description="Search products"
)
def search_products(key_word: str):
    try:
        consulta = text("SELECT * FROM product WHERE name LIKE :name OR description LIKE :description")
        results = session.execute(consulta, {"name" : f"%{key_word}%", "description" : f"%{key_word}%"}).fetchall()
        
        print(results)
        
        if results:
            products = {}
            i = 0
            for row in results:
                products[i] = get_product(row[0])
                i += 1    
                
            return list(products.values())
        else:
            return None
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()


# Búsqueda de productos (Con filtros)
@user.get(
    "/search_by_filter/products",
    tags=["products"],
    description="Search products"
)
def filter_products(materials: str):
    try:
        consulta = text("SELECT product_id FROM material WHERE material = :material")
        results = session.execute(consulta, {"material" : materials}).fetchall()
        
        if results:
            products = {}
            i = 0
            for row in results:
                products[i] = get_product(row[0])
                i += 1    
            return list(products.values())
        else:
            return None 
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        return None
    finally:
        session.close()