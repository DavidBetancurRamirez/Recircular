from Connection import *
from datetime import datetime

class Recircular:
    
    def __init__(self):
        self.__users_database = []
        self.__products_database = []
    
    def sign_in(self, name, email, password):
        # self.__users_database.append(User(name, email, password, phone))
        try:
            '''name, email, password, phone'''
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            conexion = Connection.database_connection()
            cursor = conexion.cursor(buffered=True)
            sql = 'insert into user values(null,%s,%s,%s,null, null,%s);'
            valores = (name, email, hashed_password, datetime.now())
            cursor.execute(sql, valores)
            conexion.commit()
            conexion.close()
            
        except mysql.connector.Error as error:
            print("Failed to connect to database.", error)
    
    # return user_id, boolean
    def login(self, email, password):
        try:
            '''email, password'''
            conexion = Connection.database_connection()
            cursor = conexion.cursor(buffered=True)
            sql = 'SELECT id FROM user WHERE email = %s AND password = %s;'
            cursor.execute(sql, (email, password))
            user_data = cursor.fetchone()
            
            if user_data:
                user_id = user_data[0]  # Extraer el ID del resultado
                conexion.commit()
                conexion.close()
                return user_id, True
            else:
                conexion.close()
                return None, False
        except mysql.connector.Error as error:
            print("Failed to connect to database.", error)
            return None, False
    
    # return user_id, boolean
    def login_encriptada(self, email, password):
        try:
            '''email, password'''
            conexion = Connection.database_connection()
            cursor = conexion.cursor(buffered=True)
            cursor.execute("SELECT password FROM user WHERE email = %s", (email,))
            result = cursor.fetchone()
            
            if result:
                hashed_password = result[0]
                is_password_valid = bcrypt.checkpw(password.encode('utf-8'), hashed_password)
                if is_password_valid:
                    # Obtener el ID del usuario si la contraseña es válida
                    cursor.execute("SELECT id FROM user WHERE email = %s", (email,))
                    user_id = cursor.fetchone()[0]
                    conexion.commit()
                    conexion.close()
                    return user_id, True
                else:
                    return None, False
            else:
                conexion.close()
                return None, False
        except mysql.connector.Error as error:
            print("Failed to connect to database.", error)
            return None, False







    
    
        