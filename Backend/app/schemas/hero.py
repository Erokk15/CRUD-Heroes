def heroEntity(item) -> dict:
    return {
        "hero_id": item.get("hero_id", None),
        "name": item.get("name", ""),
        "eye_color": item.get("eye_color", ""),
        "hair_color": item.get("hair_color", ""),
        "skin_color": item.get("skin_color", ""),
        "height": item.get("height", 0),
        "weight": item.get("weight", 0),
        "race": item.get("race", ""),
        "publisher_id": item.get("publisher_id", 0),
        "gender_id": item.get("gender_id", 0),
        "alignment_id": item.get("alignment_id", 0)
    }

def heroesEntity(entity) -> list:
    return [heroEntity(item) for item in entity]

def genderEntity(item) -> dict:
    return {
        "gender_id": item.get("gender_id", None),
        "name": item.get("name", "")
    }

def gendersEntity(entity) -> list:
    return [genderEntity(item) for item in entity]

def publisherEntity(item) -> dict:
    return {
        "publisher_id": item.get("publisher_id", None),
        "publisher_name": item.get("publisher_name", "")
    }
    
def publishersEntity(entity) -> list:
    return [publisherEntity(item) for item in entity]

def alignmentEntity(item) -> dict:
    return {
        "alignment_id": item.get("alignment_id", None),
        "name": item.get("name", "")
    }
    
def alignmentsEntity(entity) -> list:
    return [alignmentEntity(item) for item in entity]
