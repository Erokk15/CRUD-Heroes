from pydantic import BaseModel
from typing import Optional

class HeroInformation(BaseModel):
    alignment_id: Optional[int] = None
    eye_color: Optional[str] = None
    gender_id: Optional[int] = None
    hair_color: Optional[str] = None
    height: Optional[int] = None
    hero_id: Optional[int] = None
    name: Optional[str] = None
    publisher_id: Optional[int] = None
    race: Optional[str] = None
    skin_color: Optional[str] = None
    weight: Optional[int] = None
    
class GenderInformation(BaseModel):
    gender_id: int
    name: str
    
class PublisherInformation(BaseModel):
    publisher_id: int
    publisher_name: str
    
class AlignmentInformation(BaseModel):
    alignment_id: int
    name: str
