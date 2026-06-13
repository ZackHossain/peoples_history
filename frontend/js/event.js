const params =
    new URLSearchParams(
        window.location.search
    );

const uuid =
    params.get("uuid");

async function loadEvent() {

    const event =
        await getEvent(uuid);

    document
        .getElementById("event")
        .innerHTML = `
            <h1>${event.name}</h1>

            <p>
                ${event.summary}
            </p>
        `;
}

loadEvent();