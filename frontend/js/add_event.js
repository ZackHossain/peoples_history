var resourcesHtml = `
    <p>Resources</p>
`;
var numOfResources = 0;

function getResourcesHtml() {
    html = resourcesHtml
    for (var i = 0; i < numOfResources; i++) {
        html += addResource()
    }
    return html
}

function addResource() {
    return `
        <div>
            <label>Name</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Author</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Source (MLA format)</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Link</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Type</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Summary</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
        </div>
    `
}

function removeResource() {

}

function getResource(i) {
    
}

document
    .getElementById("resources")
    .innerHTML = getResourcesHtml()

document
    .getElementById("add_resource")
    .addEventListener(
        "click",
        () => {
            numOfResources++;
            console.log(numOfResources);
            document
                .getElementById("resources")
                .innerHTML = getResourcesHtml();
        }
    )

document
    .getElementById("remove_resource")
    .addEventListener(
        "click",
        () => {
            numOfResources--;
            console.log(numOfResources);
            document
                .getElementById("resources")
                .innerHTML = getResourcesHtml();
        }
    )

document
    .getElementById("event-form")
    .addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const event = {
                name:
                    document.getElementById("name").value,

                start_date:
                    document.getElementById("start_date").value,

                end_date:
                    document.getElementById("end_date").value,

                summary:
                    document.getElementById("summary").value,

                countries: [
                    document.getElementById("country").value
                ],
                resources: [],
                tags: [],
                relationships: []
            };

            await createEvent(event);

            window.location.href =
                "add_event.html";
        }
    );