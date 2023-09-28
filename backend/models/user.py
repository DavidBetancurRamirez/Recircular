from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint, Index, MetaData
from config.db import meta, engine
from sqlalchemy.sql.sqltypes import Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base(metadata = meta)

# class UserTable(Base):
#     __tablename__ = 'user'
    
#     id = Column(Integer, primary_key=True, autoincrement=True, name='id')
#     username = Column(String(24), nullable=False, unique=True, name='username')
#     email = Column(String(100), nullable=False, unique=True, name='email')
#     password = Column(String(360), nullable=False, name='password')
#     phone = Column(String(16), name='phone')
#     # ShippingAddress_id = Column(Integer, ForeignKey('shipping_address.id'), name='ShippingAddress_id')
#     date_created = Column(DateTime, nullable=False, name='date_created')
#     date_updated = Column(DateTime, name='date_updated')
#     UniqueConstraint('username', name='username_UNIQUE'), 
#     UniqueConstraint('email', name='email_UNIQUE'), 
#     Index('fk_User_ShippingAddress1_idx', 'ShippingAddress_id')
    
#     users = Table(__tablename__,meta, id, username, email, password, phone, date_created, date_updated)

# class ShippingAddressTable():
#     __tablename__ = 'shipping_address'
    
#     id_shipping_address = Column('id', Integer, primary_key=True, autoincrement=True) 
#     country = Column('country', String(45)), 
#     city = Column('city', String(45)), 
#     province = Column('province', String(45)), 
#     address = Column('address', String(45)), 
#     description = Column('description', String(45)), 
#     postal_code = Column('postal_code', Integer)
    
#     shipping_address = Table(__tablename__, meta, id_shipping_address, country, city, province, address, description, postal_code)


users = Table("user", meta, 
             Column("id", Integer, primary_key=True, autoincrement=True), 
             Column("username", String(24), nullable=False, unique=True), 
             Column("email", String(100), nullable=False, unique=True), 
             Column("password", String(360), nullable=False), 
             Column("phone", String(16)), 
             Column("ShippingAddress_id", Integer, ForeignKey('shipping_address.id')), 
             Column("date_created", DateTime, nullable=False), 
             Column("date_updated", DateTime), 
             UniqueConstraint('username', name='username_UNIQUE'), 
             UniqueConstraint('email', name='email_UNIQUE'), 
             Index('fk_User_ShippingAddress1_idx', 'ShippingAddress_id')
             )

shipping_address = Table("shipping_address", meta, 
                         Column('id', Integer, primary_key=True, autoincrement=True), 
                         Column('country', String(45)), 
                         Column('city', String(45)), 
                         Column('province', String(45)), 
                         Column('address', String(45)), 
                         Column('description', String(45)), 
                         Column('postal_code', Integer)
                         )

meta.create_all(engine)

