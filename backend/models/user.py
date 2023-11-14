from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint, Index, MetaData
from config.db import meta, engine
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Float, ARRAY, Boolean, BLOB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import *
import uuid


users = Table("user", meta, 
             Column("id", String(36), primary_key=True), 
             Column("username", String(24), nullable=False, unique=True), 
             Column("email", String(100), nullable=False, unique=True), 
             Column("password", String(360), nullable=False), 
             Column("phone", String(16)), 
             Column("ShippingAddress_id", Integer, ForeignKey('shipping_address.id')), 
             Column("address", String(240)),
             Column("status", Boolean, nullable=False),
             Column("date_created", DateTime, nullable=False), 
             Column("date_updated", DateTime), 
             UniqueConstraint('username', name='username_UNIQUE'), 
             UniqueConstraint('email', name='email_UNIQUE'), 
             Index('fk_User_ShippingAddress1_idx', 'ShippingAddress_id')
             )

shipping_address = Table("shipping_address", meta, 
                         Column('id', Integer, primary_key=True, autoincrement=True), 
                         Column('country', String(45), nullable=False), 
                         Column('city', String(45), nullable=False), 
                         Column('province', String(45), nullable=False), 
                         Column('address', String(45), nullable=False), 
                         Column('description', String(45)), 
                         Column('postal_code', Integer)
                         )


products = Table("product", meta,
        Column("id", String(36), primary_key=True),
        Column("user_id", String(36), ForeignKey("user.id"), nullable=False),
        Column("name", String(45), nullable=False),
        Column("description", String(1000), nullable=False),
        Column("status", Boolean, nullable=False),
        Column("date_created", DateTime, nullable=False),
        Index('user_id_idx', 'user_id')
)


images = Table("image", meta,
    Column("id", String(36), primary_key=True),
    Column("product_id", String(36), ForeignKey("product.id"), nullable=False),
    Column("image", String(1024), nullable=False),
    Index('product_id_idx', 'product_id')
)

materials = Table("material", meta,
    Column("id", String(36), primary_key=True),
    Column("product_id", String(36), ForeignKey("product.id"), nullable=False),
    Column("material", String(45), nullable=False),
    Index('product_id_idx', 'product_id')
)

characteristics = Table("characteristic", meta,
    Column("id", String(36), primary_key=True),
    Column("product_id", String(36), ForeignKey("product.id"), nullable=False),
    Column("characteristic", String(45), nullable=False),
    Index('product_id_idx', 'product_id'))
    


meta.create_all(engine)

