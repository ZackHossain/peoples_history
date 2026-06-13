from pydantic import BaseModel, Field
from typing import List, Optional

class Location(BaseModel):
    uuid: Optional[str]

    name: str

    country: str
    region: str
    city: str

    latitude: float
    longitude: float

    def to_dict(self):
        return vars(self)