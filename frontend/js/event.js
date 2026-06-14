const params =
    new URLSearchParams(
        window.location.search
    );

const uuid =
    params.get("uuid");

async function loadEvent() {

    const event =
        await getEvent(uuid);
    
    countries = ""
    for (var i = 0; i < event["countries"].length; i++) {
        countries += event["countries"][i];
        if (i < event["countries"].length - 1) {
            countries += ", "
        }
    }

    document
        .getElementById("event")
        .innerHTML = `
            <h1>${event.name}</h1>
        <div class="details">
            <p>Countries: ${countries}</p>
            <p>Timeline: ${event.start_date} - ${event.end_date}</p>
        </div>
        <p>${event.summary}</p>
        <div class="resources">
            <h3>Resources</h3>
            ${await getResources(event)}
        </div>
        `;
}

async function getResources(event) {
    resources = "";
    resource_uuids = event["resources"]
    for (r of resource_uuids) {
        resource = await getResource(r);
        resources += resourceCard(resource);
    }
    return resources;
}

function resourceCard(resource) {
    return `<div class="resource-card">
                <h4>${resource["title"]}</h4>
            </div>`;
}

loadEvent();