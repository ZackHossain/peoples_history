import json
import datetime
import uuid

EVENTS_JSON = "./data/events.json"
ENUM_JSON = "./data/enums.json"
LOCATIONS_JSON = "./data/locations.json"
TAG_JSON = "./data/tags.json"
RESOURCE_JSON = "./data/resources.json"
LINK_JSON = "./data/links.json"

# events.json
def get_event_by_uuid(uuid: str):
    events = get_json_from_file(EVENTS_JSON)
    for e in events:
        if e['uuid'] == uuid:
            return e['uuid']

def new_event(
    name: str,
    date_start: datetime.date,
    date_end: datetime.date,
    location_country: str,
    location_region: str,
    location_city: str,
    summary: str,
    resources: list,
    tags: list):
    location = get_location_by_city(location_country, location_region, location_city)
    resources_json = []
    for r in resources:
        resources_json.append({}) # new_resource()
    
    tags_json = []
    for t in tags:
        tags_json.append({}) # new_tag()
        
    return {
        "uuid": new_uuid(),
        "name": name,
        "date_start": date_start,
        "date_end": date_end,
        "location": location,
        "summary": summary,
        "resources": resources_json,
        "tags": tags_json
    }

# enum.json
def get_enums():
    pass

# locations.json
def get_location_by_uuid(uuid: str):
    pass

def get_location_by_country(country: str):
    pass

def get_location_by_region(country: str, region: str):
    pass

def get_location_by_city(country: str, region: str, city: str):
    pass

# tags.json
def get_tags():
    pass

# resources.json
def get_resource_by_uuid(uuid: str):
    pass

def get_resource_by_author(author: str):
    pass

def get_resource_by_type(type: str):
    pass

def get_resource_by_title(title: str):
    pass

def new_resource(
    title: str,
    source: str,
    link: str, #! TODO: Update
    author: str,
    type: str, #! TODO: Update
    summary: str,
):
    return {
        "uuid": new_uuid,
        "title": title,
        "source": source,
        "link": link, #! TODO: Update
        "author": author,
        "type": type,
        "summary": summary
    }

# links.json
def get_link_by_uuid(uuid: str):
    pass

# helper functions
def get_json_from_file(file: str):
    with open(file, 'r') as f:
        return json.load(f)

def save_json_to_file(file: str, data: dict):
    with open(file, 'w') as f:
        json.dump(json, f)
        
def new_uuid():
    return uuid.uuid4()