from fastapi import APIRouter, HTTPException, status
from models.hero import HeroInformation
from config.db import conn
from schemas.hero import heroEntity, heroesEntity
from bson import ObjectId

hero = APIRouter()

@hero.get("/heroes")
def find_all_heroes():
    try:
        heroes = heroesEntity(conn.hero_information.find())
        return heroes
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@hero.post("/heroes")
def create_hero(hero: HeroInformation):
    try:
        new_hero = dict(hero)
        new_hero.pop("id", None) 
        inserted_id = conn.hero_information.insert_one(new_hero).inserted_id
        
        hero = conn.hero_information.find_one({"_id": ObjectId(inserted_id)})
        return heroEntity(hero)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@hero.get("/heroes/{hero_id}")
def find_hero(hero_id: int):
    try:
        hero = conn.hero_information.find_one({"hero_id": hero_id})
        if hero:
            return heroEntity(hero)
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hero not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@hero.put("/heroes/{hero_id}")
def update_hero(hero_id: int, hero: HeroInformation):
    try:
        updated_hero = conn.hero_information.find_one_and_update(
            {"hero_id": hero_id},
            {"$set": dict(hero)},
            return_document=True
        )
        if updated_hero:
            return heroEntity(updated_hero)
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hero not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@hero.delete("/heroes/{hero_id}")
def delete_hero(hero_id: int):
    try:
        result = conn.hero_information.delete_one({"hero_id": hero_id})
        if result.deleted_count == 1:
            return {"message": "Hero deleted successfully"}
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hero not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))