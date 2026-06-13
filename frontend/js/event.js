const params =
    new URLSearchParams(
        window.location.search
    );

const uuid =
    params.get("uuid");

async function loadEvent() {

    const event =
        await getEvent(uuid);
    
    console.log(event);

    document
        .getElementById("event")
        .innerHTML = `
            <h2>${event.name}</h2>
        <div class="details">
            <p>Countries: Russia, Germany</p>
            <p>Timeline: ${event.start_date} - ${event.end_date}</p>
        </div>
        <p>${event.summary}</p>
        <div class="resources">
            ${getResources(event)}
        </div>
        `;
}

function getResources(event) {
    return '<div></div>';
}

loadEvent();