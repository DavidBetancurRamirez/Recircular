from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from fastapi import File, UploadFile, Form

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: Optional[str] = None
    password: Optional[str] = None
    status: Optional[bool] = None
    phone: Optional[str] = None
    ShippingAddress_id: Optional[int] = None
    date_created: Optional[datetime] = None
    date_updated: Optional[datetime] = None
    address: Optional[str] = None
    

class ShippingAddress(BaseModel):
    id: Optional[int] = None
    country: str
    city: str
    province: str
    address: str
    description: Optional[str] = None
    postal_code: Optional[str] = None


class Product(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    name: str
    description: str
    characteristics: list[str]
    images: list[str] 
    materials: list[str] 
    status: Optional[bool] = None
    date_created: Optional[datetime] = None


class Change(BaseModel):
    email: str
    old_password: str
    new_password: str
    