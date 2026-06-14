var resourcesHtml = `
    <p>Resources</p>
    <div id="resource_0"></div>
`;
var numOfResources = 0;

function addResource() {
    return `
        <div>
            <label>Name</label>
            <textarea id="resource_${numOfResources}_name"></textarea>
            <label>Author</label>
            <textarea id="resource_${numOfResources}_author"></textarea>
            <label>Source (MLA format)</label>
            <textarea id="resource_${numOfResources}_source"></textarea>
            <label>Link</label>
            <textarea id="resource_${numOfResources}_link"></textarea>
            <label>Type</label>
            <textarea id="resource_${numOfResources}_type"></textarea>
            <label>Summary</label>
            <textarea id="resource_${numOfResources}_summary"></textarea>
        </div>
        <div id="resource_${numOfResources + 1}"></div>
    `
}

function getResources() {
    all_resources = []
    for (var i = 0; i < numOfResources; i++) {
        const new_resource = {
            name: document.getElementById("resource_" + i + "_name").value,
            author: document.getElementById("resource_" + i + "_author").value,
            source: document.getElementById("resource_" + i + "_source").value,
            link: document.getElementById("resource_" + i + "_link").value,
            type: document.getElementById("resource_" + i + "_type").value,
            summary: document.getElementById("resource_" + i + "_summary").value,
        }
        all_resources.push(new_resource);
    }
    return all_resources;
}

document
    .getElementById("resources")
    .innerHTML = resourcesHtml;

document
    .getElementById("add_resource")
    .addEventListener(
        "click",
        () => {
            document
                .getElementById("resource_" + (numOfResources))
                .innerHTML = addResource();
            numOfResources++;
        }
    );

document
    .getElementById("remove_resource")
    .addEventListener(
        "click",
        () => {
            if (numOfResources <= 0) {
                return;
            }
            document
                .getElementById("resource_" + (numOfResources - 1))
                .innerHTML = "";
            numOfResources--;
        }
    );

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

            var resources = getResources();

            for (const r of resources) {
                await createResource(r);
            }

            window.location.href =
                "add_event.html";
        }
    );