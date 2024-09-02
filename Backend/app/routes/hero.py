from fastapi import APIRouter, HTTPException, status, Query
from models.hero import HeroInformation
from config.db import conn
from schemas.hero import heroEntity, heroesEntity, genderEntity, gendersEntity, publisherEntity, publishersEntity, alignmentEntity, alignmentsEntity
from bson import ObjectId

hero = APIRouter()

@hero.get("/heroes")
def find_all_heroes(
    limit: int = Query(10),
    offset: int = Query(0),
    name: str = Query(None),
    publisher_id: int = Query(None),
    gender_id: int = Query(None),
    alignment_id: int = Query(None),
    race: str = Query(None)
):
    try:
        query = {"hero_id": {"$exists": True, "$ne": None}}  # Añade el filtro para hero_id

        if name:
            query["name"] = {"$regex": name, "$options": "i"}
        if publisher_id:
            query["publisher_id"] = publisher_id
        if gender_id:
            query["gender_id"] = gender_id
        if alignment_id:
            query["alignment_id"] = alignment_id
        if race:
            query["race"] = race

        # Ordenar los héroes por `hero_id` en orden ascendente
        heroes = heroesEntity(conn.hero_information.find(query).sort("hero_id", 1).skip(offset).limit(limit))
        total_count = conn.hero_information.count_documents(query)
        return {"data": heroes, "total": total_count}
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
    

@hero.get("/genders")
def find_all_genders():
    try:
        genders = gendersEntity(conn.gender.find())
        return {"data": genders}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

@hero.get("/publishers")
def find_all_publishers():
    try:
        publishers = publishersEntity(conn.publisher.find())
        return {"data": publishers}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
    
@hero.get("/alignments")
def find_all_alignments():
    try:
        alignments = alignmentsEntity(conn.alignment.find())
        return {"data": alignments}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
    
@hero.get("/check-hero-id")
def check_hero_id(hero_id: int):
    try:
        exists = conn.hero_information.count_documents({"hero_id": hero_id}) > 0
        return {"exists": exists}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@hero.get("/races")
def find_all_races():
    try:
        races = conn.hero_information.distinct("race")
        return {"data": races}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
