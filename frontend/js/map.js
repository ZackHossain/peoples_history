const EVENT_COLOURS = {
    revolution: "#cc0000",
    bourgeois_revolution: "#48B8D0",
    anti_colonial: "#F1AF8B",
    war: "#090C08",
    counter_revolution: "#0F4880",
    mass_radicalisation: "#EFA8B8",
    workers_state: "#560007",
    significant_moment: "#D8D538",
    general_info: "#cccccc",
    strike: "#EBCDD4"
}

const EVENT_PRIORITY = {
    revolution: 100,
    bourgeois_revolution: 50,
    anti_colonial: 60,
    war: 50,
    counter_revolution: 80,
    mass_radicalisation: 60,
    workers_state: 100,
    significant_moment: 30,
    general_info: 0,
    strike: 60
}

let map;
let countriesLayer;
let events = [];

/**
 * Filters
 */
document
    .getElementById("year-input")
    .addEventListener("input", updateMap);

document
    .querySelectorAll(".filter-section input[type='checkbox']")
    .forEach(element => {
        element.addEventListener("change", updateMap);
    })

function getTypes() {
    const checkboxes =
        document.querySelectorAll(
            ".filter-section input[type='checkbox']"
        );

    const types = {};

    checkboxes.forEach(cb => {
        types[cb.value] = cb.checked;
    });

    return types;
}

/**
 * Timelapse
 */
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTimelapse() {
    yearFrom = document.getElementById("year-from").value;
    yearTo = document.getElementById("year-to").value;
    if (yearFrom >= yearTo) {
        document.getElementById("year-input").value = yearFrom;
        updateMap();
        return;
    } else {
        for (let i = yearFrom; i <= yearTo; i++) {
            document.getElementById("year-input").value = i;
            updateMap();
            await sleep(1000);
        }
    }
}

/**
 * Basic Map Population
 */

async function initialiseMap() {

    map = L.map("map").setView([20, 0], 2);

    const geojson = await fetch(
        "data/world.geo.json/countries.geo.json"
    ).then(r => r.json());

    countriesLayer = L.geoJSON(
        geojson,
        {
            style: countryStyle,
            onEachFeature: onEachCountry
        }
    ).addTo(map);

    events = await getEvents();

    updateMap();
}

function countryStyle(feature) {
    const filter = getTypes();

    const year =
        parseInt(
            document.getElementById("year-input").value
        );

    const activeCountries =
        getActiveCountries(year, filter);

    const country =
        feature.properties.name;

    const active =
        country in activeCountries;

    return {
        color: "#333",
        weight: 1,
        fillOpacity: active ? 0.7 : 0.1,
        fillColor: active ? getCountryColour(activeCountries[country]) : "#cccccc"
    };
}

function getCountryColour(events) {
    if (events.length === 0) {
        return null;
    }

    let priorityEvent = events[0];
    let greatestPriority = EVENT_PRIORITY[priorityEvent.type.toLowerCase().replaceAll(" ", "_")]

    for (const event of events) {
        priority = EVENT_PRIORITY[event.type.toLowerCase().replaceAll(" ", "_")];
        if (priority > greatestPriority) {
            greatestPriority = priority;
            priorityEvent = event;
        }
    }
    return EVENT_COLOURS[priorityEvent.type.toLowerCase().replaceAll(" ", "_")];
}

function getActiveCountries(year, filter) {

    const countries = {};

    for (const event of events) {
        type = event.type.toLowerCase().replaceAll(" ", "_");
        console.log(type);

        if (!filter[type]) {
            console.log("here");
            continue;
        }

        const start =
            parseInt(
                event.start_date.substring(0, 4)
            );

        const end =
            parseInt(
                event.end_date.substring(0, 4)
            );

        if (
            year >= start &&
            year <= end
        ) {
            for (const c of event.countries) {
                if (c in countries) {
                    countries[c].push(event);
                } else {
                    countries[c] = [event];
                }
            }
        }
    }
    console.log(countries);
    return countries;
}

function updateMap() {
    map.closePopup();

    countriesLayer.setStyle(
        countryStyle
    );
}

/**
 * Clickable Countries code
 */

function getEventsForCountry(countryName, year) {

    const results = [];

    for (const event of events) {
        const start =
            parseInt(event.start_date.substring(0, 4));

        const end =
            parseInt(event.end_date.substring(0, 4));

        if (
            year >= start &&
            year <= end
        ) {
            for (const c of event.countries) {
                if (c.toLowerCase() == countryName.toLowerCase()) {
                    results.push(event);
                }
            }
        }
    }
    return results;
}

function onEachCountry(feature, layer) {

    layer.on("click", () => {

        const year =
            parseInt(
                document.getElementById(
                    "year-input"
                ).value
            );

        const country =
            feature.properties.name.toLowerCase();

        const countryEvents =
            getEventsForCountry(
                country,
                year
            );

        if (countryEvents.length === 0) {
            return;
        }

        showCountryPopup(
            layer,
            countryEvents
        );
    });
}

function showCountryPopup(
    layer,
    countryEvents
) {

    const event = countryEvents[0];

    const popupHtml = `
        <div class="event-popup">

            <h3>${event.name}</h3>

            <p>
                ${event.summary}
            </p>

            <button
                onclick="openEvent('${event.uuid}')"
            >
                See More
            </button>

        </div>
    `;

    layer.bindPopup(
        popupHtml
    ).openPopup();
}

function openEvent(uuid) {

    window.location.href =
        `/pages/event.html?uuid=${uuid}`;
}

window.openEvent = openEvent;

document
    .getElementById("year-input")
    .addEventListener(
        "input",
        updateMap
    );

initialiseMap();