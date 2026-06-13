from peoples_history.storage.database_controller import DatabaseController
from peoples_history.storage.json_store import JsonStore


def test_get_event(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([
        {
            "uuid": "123",
            "name": "October Revolution"
        }
    ])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    event = db.get_event("123")

    assert event != None
    assert event["name"] == "October Revolution"

def test_get_event_returns_none_when_missing(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    result = db.get_event("missing")

    assert result is None

def test_add_event(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    event = {
        "uuid": "1",
        "name": "October Revolution"
    }

    db.add_event(event)

    result = db.get_events()

    assert len(result) == 1
    assert result[0]["uuid"] == "1"

def test_delete_event(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([
        {
            "uuid": "1",
            "name": "October Revolution"
        }
    ])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    db.delete_event("1")

    events = db.get_events()

    assert len(events) == 0

def test_search_by_tag(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([
        {
            "uuid": "1",
            "name": "October Revolution",
            "tags": ["revolution"]
        },
        {
            "uuid": "2",
            "name": "World War I",
            "tags": ["war"]
        }
    ])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    results = db.search_events_by_tag("revolution")

    assert len(results) == 1
    assert results[0]["name"] == "October Revolution"
    
def test_search_by_year(tmp_path):

    event_file = tmp_path / "events.json"

    store = JsonStore(event_file)

    store.write([
        {
            "uuid": "1",
            "name": "October Revolution",
            "start_date": "1917-11-07"
        },
        {
            "uuid": "2",
            "name": "German Revolution",
            "start_date": "1918-11-01"
        }
    ])

    db = DatabaseController(
        store,
        None,
        None,
        None,
        None
    )

    results = db.search_events_by_year(1917)

    assert len(results) == 1
    assert results[0]["name"] == "October Revolution"

