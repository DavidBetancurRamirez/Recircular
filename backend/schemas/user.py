from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    password: str
    phone: Optional[str] = None
    ShippingAddress_id: Optional[int] = None
    date_created: datetime
    date_updated: Optional[datetime] = None
    

class LogIn(BaseModel):
    username: str
    password: str
