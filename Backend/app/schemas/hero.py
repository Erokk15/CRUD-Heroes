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