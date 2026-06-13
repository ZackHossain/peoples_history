import json

from peoples_history.storage.json_store import JsonStore


def test_write_and_read(tmp_path):

    test_file = tmp_path / "events.json"

    store = JsonStore(test_file)

    data = [
        {
            "uuid": "1",
            "name": "October Revolution"
        }
    ]

    store.write(data)

    result = store.read()

    assert result == data