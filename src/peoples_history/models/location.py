from dataclasses import dataclass


@dataclass
class Location:
    uuid: str

    name: str

    country: str
    region: str
    city: str

    latitude: float
    longitude: float

    def to_dict(self):
        return vars(self)