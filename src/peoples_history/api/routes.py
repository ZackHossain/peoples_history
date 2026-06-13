from flask import Blueprint
from flask import jsonify
from flask import request
from pathlib import Path

from peoples_history.storage.json_store import JsonStore
from peoples_history.storage.database_controller import DatabaseController

EVENT_STORE = JsonStore(Path(__file__).resolve().parent / "../data/events.json")
ORGANISATION_STORE = JsonStore(Path(__file__).resolve().parent / "../data/organisations.json")
TAGS_STORE = JsonStore(Path(__file__).resolve().parent / "../data/tags.json")
PEOPLE_STORE = JsonStore(Path(__file__).resolve().parent / "../data/people.json")
PERIODS_STORE = JsonStore(Path(__file__).resolve().parent / "../data/periods.json")

api = Blueprint("api", __name__)

db = DatabaseController(EVENT_STORE, ORGANISATION_STORE, TAGS_STORE, PEOPLE_STORE, PERIODS_STORE)

@api.route("/events")
def get_events():

    return jsonify(
        db.get_events()
    )
    
@api.route("/events/<uuid>")
def get_event(uuid):

    event = db.get_event(uuid)

    if event is None:
        return jsonify(
            {"error": "event not found"}
        ), 404

    return jsonify(event)

@api.route(
    "/events",
    methods=["POST"]
)
def add_event():

    event = request.json
    
    print(event)

    event["uuid"] = db.new_uuid()

    db.add_event(event)

    return jsonify(event)

@api.route(
    "/events/<uuid>",
    methods=["DELETE"]
)
def delete_event(uuid):

    db.delete_event(uuid)

    return jsonify(
        {"status": "deleted"}
    )
    
@api.route(
    "/events/<uuid>",
    methods=["PUT"]
)
def update_event(uuid):
    event = request.json

    db.update_event(event)

    return jsonify(event)