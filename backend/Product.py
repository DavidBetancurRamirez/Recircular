

class Product:
    
    def __init__(self, name, price, description, stock):
        self.__name = name
        self.__price = price
        self.__description = description
        self.__stock = stock

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    @property
    def price(self):
        return self.__price

    @price.setter
    def price(self, value):
        self.__price = value

    @property
    def description(self):
        return self.__description

    @description.setter
    def description(self, value):
        self.__description = value

    @property
    def stock(self):
        return self.__stock

    @stock.setter
    def stock(self, value):
        self.__stock = value

    
    