let map;
let countriesLayer;
let events = [];

/**
 * Page function
 */

function toggleSidebar() {
    document
        .getElementById("sidebar")
        .classList
        .toggle("open");
}

window.toggleSidebar = toggleSidebar;

document
    .getElementById("year-input")
    .addEventListener("input", updateMap);


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

    const year =
        parseInt(
            document.getElementById("year-input").value
        );

    const activeCountries =
        getActiveCountries(year);

    const country =
        feature.properties.name;

    const active =
        activeCountries.has(country);

    return {
        color: "#333",
        weight: 1,
        fillOpacity: active ? 0.7 : 0.1,
        fillColor: active ? "#cc0000" : "#cccccc"
    };
}

function getActiveCountries(year) {

    const countries = new Set();

    for (const event of events) {

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
                countries.add(
                    c
                );
            }
        }
    }

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