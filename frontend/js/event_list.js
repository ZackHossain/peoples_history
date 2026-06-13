async function loadEvents() {

    const events = await getEvents();

    const container = document.getElementById("events");

    container.innerHTML = "";

    for (const event of events) {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.name}</h3>

            <p>
                from 
                ${formatDate(event.start_date)}
                to 
                ${formatDate(event.end_date)}
            </p>

            <p>${event.summary}</p>

            <button onclick="editEvent('${event.uuid}')">
                Edit
            </button>

            <button onclick="removeEvent('${event.uuid}')">
                Delete
            </button>
        `;

        container.appendChild(card);
    }
}

function editEvent(uuid) {
    window.location.href =
        `edit_event.html?uuid=${uuid}`;
}

async function removeEvent(uuid) {

    if (!confirm("Delete event?")) {
        return;
    }

    await deleteEvent(uuid);

    loadEvents();
}

loadEvents();

// Utils

function formatDate(dateStr) {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    return date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}