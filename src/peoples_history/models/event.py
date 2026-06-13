from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from peoples_history.models.resource import Resource

class Event(BaseModel):
    uuid: Optional[str] = None
    name: str

    start_date: date
    end_date: date

    summary: str

    countries: List[str]
    resources: Optional[List[Resource]] = None
    tags: List[str] = Field(default_factory=list)
    relationships: List[str] = Field(default_factory=list)

    def to_dict(self):
        return vars(self)