const params =
    new URLSearchParams(window.location.search);

const uuid = params.get("uuid");

async function loadEvent() {

    const event =
        await getEvent(uuid);

    document.getElementById("name").value =
        event.name;

    document.getElementById("start_date").value =
        event.start_date;

    document.getElementById("end_date").value =
        event.end_date;

    document.getElementById("summary").value =
        event.summary;
}

document
    .getElementById("event-form")
    .addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const event = {
                uuid:
                    uuid,
                name:
                    document.getElementById("name").value,

                start_date:
                    document.getElementById("start_date").value,

                end_date:
                    document.getElementById("end_date").value,

                summary:
                    document.getElementById("summary").value
            };

            await updateEvent(uuid, event);

            window.location.href =
                "/";
        }
    );

loadEvent();