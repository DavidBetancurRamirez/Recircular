import Product
import ShippingAddress

class User:
    
    def __init__(self, name, email, password, phone):
        self.__name = name
        self.__email = email
        self.__password = password
        self.__phone = phone
        self.__product = [] # Products Array

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, value):
        self.__email = value

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, value):
        self.__password = value

    @property
    def phone(self):
        return self.__phone

    @phone.setter
    def phone(self, value):
        self.__phone = value

    @property
    def product(self):
        return self.__product

    @product.setter
    def product(self, value):
        self.__product = value
