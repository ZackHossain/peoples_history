import uuid

class DatabaseController:

    def __init__(
        self,
        events_store,
        locations_store,
        tags_store,
        resources_store,
        relationships_store
    ):
        self.events = events_store
        self.locations = locations_store
        self.tags = tags_store
        self.resources = resources_store
        self.relationships = relationships_store

    def new_uuid(self):
        return str(uuid.uuid4())
    
    #
    # Event Functions
    #
    
    def get_events(self):
        return self.events.read()

    def get_event(self, event_uuid):
        for event in self.events.read():
            if event["uuid"] == event_uuid:
                return event
        return None

    def add_event(self, event):

        events = self.events.read()

        events.append(event)

        self.events.write(events)

        return event

    def delete_event(self, event_uuid):

        events = self.events.read()

        events = [
            e
            for e in events
            if e["uuid"] != event_uuid
        ]

        self.events.write(events)
    
    def update_event(self, event):
        events = self.events.read()
        
        new_events = []
        
        for e in events:
            if e["uuid"] == event["uuid"]:
                new_events.append(event)
            else:
                new_events.append(e)
        
        self.events.write(new_events)
                
    
    #
    # SEARCH FUNCTIONS
    #
    def search_events_by_tag(self, tag_uuid):

        results = []

        for event in self.events.read():

            if tag_uuid in event["tags"]:
                results.append(event)

        return results
    
    def search_events_by_location(self, location_uuid):

        results = []

        for event in self.events.read():

            if location_uuid in event["locations"]:
                results.append(event)

        return results
    
    def search_events_by_year(self, year):

        results = []

        for event in self.events.read():

            start_year = int(event["start_date"][:4])

            if start_year == year:
                results.append(event)

        return results
    
    #
    # RESOURCE FUNCTIONS
    #
    def get_resource(self, uuid):
        for resource in self.resources.read():
            if resource["uuid"] == uuid:
                return resource
        return None
    
    def add_resource(self, resource):
        resource["uuid"] = self.new_uuid()
        
        resources = self.resources.read()

        resources.append(resource)

        self.events.write(resource)

        return resource

    def update_resource(self, resource):
        resources = self.resources.read()
        
        new_resources = []
        
        for e in resources:
            if e["uuid"] == resource["uuid"]:
                new_resources.append(resource)
            else:
                new_resources.append(e)
        
        self.events.write(new_resources)