from sqlalchemy import Table, Column, ForeignKey, UniqueConstraint, Index, MetaData
from config.db import meta, engine
from sqlalchemy.sql.sqltypes import Integer, String, DateTime
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


"""CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  price FLOAT NOT NULL,
  stock INT NOT NULL,
  date_created DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX user_id_idx (user_id ASC),
  CONSTRAINT product_user_fk
    FOREIGN KEY (user_id) REFERENCES user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);"""

meta.create_all(engine)

