from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint, Index, MetaData
from config.db import meta, engine
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base


users = Table("user", meta, 
             Column("id", String(36), primary_key=True), 
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
        Column("description", String(320), nullable=False),
        Column("price", Float, nullable=False),
        Column("stock", Integer, nullable=False),
        Column("date_created", DateTime, nullable=False),
        Index('user_id_idx', 'user_id')
)


key_words = Table( "key_words", meta,
        Column("id", Integer, primary_key=True),
        Column("product_id", String(36), ForeignKey("product.id"), nullable=False),
        Column("key_wordscol", String(45), nullable=False),
        Index('id_idx', 'product_id')
)


practica = Table(
        Column("arrays", String(10000))
)

meta.create_all(engine)
