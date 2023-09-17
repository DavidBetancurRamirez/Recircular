import mysql.connector

class Connection:
    
    def database_connection():
        try:
            conexion = mysql.connector.connect(user='root', password='Tomaslopera801',
                                   host='localhost', database='recircular', # localhost = 127.0.0.1
                                   port='3306')
            return conexion
            
        except mysql.connector.Error as error:
            print('Error al conectarte a la base de datos {}'.format(error))