from pydantic import BaseModel

class HeroInformation(BaseModel):
    hero_id: int
    name: str
    eye_color: str
    hair_color: str
    skin_color: str
    height: float
    weight: float
    race: str
    publisher_id: int
    gender_id: int
    alignment_id: int
    
class GenderInformation(BaseModel):
    gender_id: int
    name: str
    
class PublisherInformation(BaseModel):
    publisher_id: int
    publisher_name: str
    
class AlignmentInformation(BaseModel):
    alignment_id: int
    name: str
