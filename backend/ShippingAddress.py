

class ShippingAddress:
    
    def __init__(self, country, city, province, address, description, postal_code):
        self.__country = country
        self.__city = city
        self.__province = province
        self.__addrress = address
        self.__description = description
        self.__postal_code = postal_code

    @property
    def country(self):
        return self.__country

    @country.setter
    def country(self, value):
        self.__country = value

    @property
    def city(self):
        return self.__city

    @city.setter
    def city(self, value):
        self.__city = value

    @property
    def province(self):
        return self.__province

    @province.setter
    def province(self, value):
        self.__province = value

    @property
    def addrress(self):
        return self.__addrress

    @addrress.setter
    def addrress(self, value):
        self.__addrress = value

    @property
    def description(self):
        return self.__description

    @description.setter
    def description(self, value):
        self.__description = value

    @property
    def postal_code(self):
        return self.__postal_code

    @postal_code.setter
    def postal_code(self, value):
        self.__postal_code = value
