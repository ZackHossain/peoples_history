# People's History

## To Do

- Implement data validation on new db entries
- 

## Functionality

Users should be able to see various historical events, period, locations, etc. via an interactive world map via a website. Events (one off or periods) should have a summary of the event with extra resources and readings.

### Historical locations

Historical locations should be accessibly as a timeline by country, region, city, etc. E.G. Russia would consist of pre-1890s, 1890s (establishment of the bolsheviks, wars, etc.), 1900s (1905, war, etc.), 1910s (WWI, Russian revolution, etc.), ..., 2024 (Ukraine war, etc.)...

This timeline should be searchable, and the time period can be set by the user.

### Historical events

One off events should include a short summary of what happened and extra readings. E.G. The October Insurrection

Periods should consist of multiple one-off events which string together to form a larger event. E.G. The Russian Revolution

### Historical Periods

This should encompass large-scale historical events that go beyond just one country (WWI, WWII, other wars, major geopolitical events, etc.)

### Updating events

Users should be able to update and edit these events to include more info, new events, etc.

## Structure

Event JSON:
{
    uuid: String,
    name: String,
    date_start: DateTime,
    date_end: DateTime,
    location: String (uuid of a Location),
    summary: String,
    resources: String (uuid of Resource)[],
    tags: String (uuid of Tag)[]
}

Tag JSON:
{
    uuid: String,
    title: String
}

Location JSON:
{
    uuid: String,
    country: String,
    region: String,
    city: String
}

Resource JSON:
{
    uuid: String,
    title: String
    source: String, // Chicago A format reference
    link: String (uuid of Link),
    author: String,
    type: TypeEnum,
    summary: String
}

TypeEnum:
{
    "Article",
    "Book",
    "Podcast"
}

Link JSON
{
    uuid: String,
    link_exists: bool,
    link: String
}

## Files

events.json:
[
    Event JSON
]

enum.json:
[
    {
        types: [
            Type Enum
        ],

    }
]

locations.json: # should be searchable by uuid, country, region, etc.
[
    Location JSON
]

tags.json:
[
    Tag JSON
]

resources.json:
[
    Resource JSON
]

links.json:
[
    Link JSON
]