def test_get_events_endpoint(client):

    response = client.get("/events")

    assert response.status_code == 200

    assert isinstance(
        response.get_json(),
        list
    )

def test_get_missing_event(client):

    response = client.get(
        "/events/does-not-exist"
    )

    assert response.status_code == 404

# def test_event_influences_other_event():

#     relationship = {
#         "source_uuid": "october",
#         "target_uuid": "german",
#         "relationship_type": "influenced"
#     }

#     influenced = db.get_related_events(
#         "october",
#         "influenced"
#     )

#     assert influenced == ["german"]
