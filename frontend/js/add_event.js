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