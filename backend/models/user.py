from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint, Index
from config.db import meta, engine
from sqlalchemy.sql.sqltypes import Integer, String, DateTime


users = Table("user", meta, 
             Column('id', Integer, primary_key=True, autoincrement=True), 
             Column('username', String(24), nullable=False, unique=True), 
             Column('email', String(100), nullable=False, unique=True), 
             Column('password', String(360), nullable=False), 
             Column('phone', String(16)), 
             Column('ShippingAddress_id', Integer, ForeignKey('shipping_address.id')), 
             Column('date_created', DateTime, nullable=False), 
             Column('date_updated', DateTime), 
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

