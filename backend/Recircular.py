# from Connection import *
# from datetime import datetime

# class Recircular:
    
#     def __init__(self):
#         self.__users_database = []
#         self.__products_database = []
    
#     def sign_in(self, name, email, password):
#         # self.__users_database.append(User(name, email, password, phone))
#         try:
#             '''name, email, password'''
#             # -> Password Encriptada
#             # hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
#             conexion = Connection.database_connection()
#             cursor = conexion.cursor(buffered=True)
#             sql = 'insert into user values(null,%s,%s,%s,null, null,%s, null);'
#             valores = (name, email, password, datetime.now())
#             cursor.execute(sql, valores)
#             conexion.commit()
#             conexion.close()
            
#         except mysql.connector.Error as error:
#             print("Failed to connect to database.", error)
    
#     # return user_id, boolean


#     def login(self, email, password):
#         try:
#             '''email, password'''
#             conexion = Connection.database_connection()
#             cursor = conexion.cursor(buffered=True)
#             sql = 'SELECT id FROM user WHERE email = %s AND password = %s;'
#             cursor.execute(sql, (email, password))
#             user_data = cursor.fetchone()
            
#             if user_data:
#                 user_id = user_data[0]  # Extraer el ID del resultado
#                 conexion.commit()
#                 conexion.close()
#                 return user_id, True
#             else:
#                 conexion.close()
#                 return None, False
#         except mysql.connector.Error as error:
#             print("Failed to connect to database.", error)
#             return None, False


#     def update_profile(self, name, email, password, phone, id):
#         try:
#             '''name, email, password, phone, shipping_address'''
#             conexion = Connection.database_connection()
#             cursor = conexion.cursor(buffered=True)
#             sql = 'UPDATE user SET user.username = %s, user.email = %s, user.password = %s, user.phone = %s, user.date_updated = %s WHERE user.id = %s;'
#             valores = (name, email, password, phone, datetime.now(), id)
#             cursor.execute(sql, valores)
#             conexion.commit()
#             conexion.close()
            
#         except mysql.connector.Error as error:
#             print("Failed to connect to database.", error)
    
#     # return user_id, boolean
#     def login_encriptada(self, email, password):
#         try:
#             '''email, password'''
#             conexion = Connection.database_connection()
#             cursor = conexion.cursor(buffered=True)
#             cursor.execute("SELECT password FROM user WHERE email = %s", (email,))
#             result = cursor.fetchone()
            
#             if result:
#                 # -> TypeError: Strings must be encoded before checking
#                 hashed_password = result[0]
#                 user_password = password.encode('utf-8')
#                 if bcrypt.checkpw(user_password, hashed_password):
#                     # Obtener el ID del usuario si la contraseña es válida
#                     cursor.execute("SELECT id FROM user WHERE email = %s", (email,))
#                     user_id = cursor.fetchone()[0]
#                     conexion.commit()
#                     conexion.close()
#                     return user_id, True
#                 else:
#                     return None, False
#             else:
#                 conexion.close()
#                 return None, False
#         except mysql.connector.Error as error:
#             print("Failed to connect to database.", error)
#             return None, False

# ############################################################################################################
# # Prácticas para ingresar a la base de datos

# prueba = Recircular()

# # prueba.sign_in('user_prueba1', 'prueba1@gmail.com', 'contrasena123')
# # prueba.sign_in('user_prueba1', 'prueba1@gmail.com', 'contrasena123')
# # prueba.sign_in('user_prueba2', 'prueba2@gmail.com', 'contrasena1234')
# # prueba.sign_in('Tomas', 'loperatomas410@gmail.com', 'AbCdEfGh-12345')

# # id, booleano = prueba.login('loperatomas410@gmail.com', 'AbCdEfGh-12345')

# # prueba.update_profile('Tomas', 'loperatomas410@gmail.com', 'AbCdEfGh-12345', '3046576354', id)

# # prueba.sign_in('Prueba_Clase', 'pruebaclase@gmail.com', 'sistemaslomejor')

# # id, booleano = prueba.login('pruebaclase@gmail.com', 'sistemaslomejor')

# # prueba.update_profile('Prueba_Clase', 'pruebaclase@gmail.com', 'sistemaslomejor', '3107732543', id)

# # print(id)
# # print(booleano)





    
    
        