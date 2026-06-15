import requests
import json

BASE_URL = "http://127.0.0.1:5050"


# -------------------------
# GET all events
# -------------------------
def get_events():
    r = requests.get(f"{BASE_URL}/events")
    print("STATUS:", r.status_code)
    print(json.dumps(r.json(), indent=2))


# -------------------------
# GET single event
# -------------------------
def get_event_by_id(event_id):
    r = requests.get(f"{BASE_URL}/events/{event_id}")
    print("STATUS:", r.status_code)
    print(json.dumps(r.json(), indent=2))

# -------------------------
# CREATE event
# -------------------------
def create_event():
    payload = {
        "name": "October Revolution",
        "start_date": "1917-11-07",
        "end_date": "1917-11-08",
        "summary": "Bolsheviks seize power in Petrograd",
        "countries": ["Russia"],
        "tags": ["revolution"],
        "resources": [
            {
                "title": "Hello",
                "author": "Chris Harman",
                "source": "my brain",
                "resource_type": "book",
                "summary": "Hello"
            }
        ]
    }

    r = requests.post(
        f"{BASE_URL}/events",
        json=payload
    )

    print("STATUS:", r.status_code)
    print(json.dumps(r.json(), indent=2))

    return r.json()

# -------------------------
# DELETE event
# -------------------------
def delete_event(event_id):
    r = requests.delete(f"{BASE_URL}/events/{event_id}")
    print("STATUS:", r.status_code)
    print(r.json())

# -------------------------
# POST resource
# -------------------------
def create_resource():
    payload = {
                "title": "Hello",
                "author": "Chris Harman",
                "source": "my brain",
                "resource_type": "book",
                "summary": "Hello"
            }
    r = requests.post(f"{BASE_URL}/resources", json=payload)
    print("STATUS:", r.status_code)
    print(json.dumps(r.json(), indent=2))

    return r.json()

# -------------------------
# GET resource
# -------------------------
def get_resource(uuid):
    r = requests.get(f"{BASE_URL}/resources/{uuid}")
    
    print("STATUS:", r.status_code)
    print(json.dumps(r.json(), indent=2))

    return r.json()

# -------------------------
# CREATE event
# -------------------------
def populate():
    with open("populate.json", 'r') as f:
        events = json.load(f)

    for e in events:
        countries = []
        for c in e["countries"]:
            countries.append(c.capitalize())
        e["countries"] = countries
        r = requests.post(
            f"{BASE_URL}/events",
            json=e
        )

        if (r.status_code != 200):
            print("STATUS:", r.status_code)
            print(json.dumps(r.json(), indent=2))


# -------------------------
# simple test flow
# -------------------------
if __name__ == "__main__":
    populate()
    
    # print("\n--- CREATE RESOURCE ---")
    # new_resource = create_resource()
    
    # print("\n--- GET RESOURCE ---")
    # resource = get_resource(new_resource["uuid"])
    # print(resource)

    # print("\n--- CREATE EVENT ---")
    # new_event = create_event()
    # print(get_resource(new_event["resources"][0]))
    
    # event_id = new_event.get("uuid")

    # print("\n--- GET SINGLE EVENT ---")
    # get_event_by_id(event_id)
    
    # print("\n--- GET ALL EVENTS ---")
    # get_events()
    
    # print("\n--- DELETE EVENT ---")
    # delete_event(event_id)
    
    # print("\n--- GET NON-EXISTENT EVENT ---")
    # get_event_by_id(event_id)

    # print("\n--- FINAL STATE ---")
    # get_events()