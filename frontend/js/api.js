const API_URL = "http://localhost:5050";

async function getEvents() {
    const response = await fetch(`${API_URL}/events`);
    return await response.json();
}

async function getEvent(uuid) {
    const response = await fetch(`${API_URL}/events/${uuid}`);
    return await response.json();
}

async function createEvent(event) {
    const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    });

    return await response.json();
}

async function updateEvent(uuid, event) {
    const response = await fetch(`${API_URL}/events/${uuid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    });

    return await response.json();
}

async function deleteEvent(uuid) {
    await fetch(`${API_URL}/events/${uuid}`, {
        method: "DELETE"
    });
}

async function createResource(resource) {
    const response = await fetch(`${API_URL}/resources`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resource)
    });

    return await response.json();
}

async function getResource(uuid) {
    const response = await fetch(`${API_URL}/resources/${uuid}`);
    return await response.json();
}