from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: str
    password: str
    phone: Optional[str] = None
    ShippingAddress_id: Optional[int] = None
    date_created: datetime
    date_updated: Optional[datetime] = None
    

class ShippingAddress(BaseModel):
    id: Optional[int] = None
    country: str
    city: str
    province: str
    address: str
    description: Optional[str] = None
    postal_code: Optional[str] = None


