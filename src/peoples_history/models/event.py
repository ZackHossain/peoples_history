from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class Event(BaseModel):
    uuid: Optional[str]
    name: str

    start_date: date
    end_date: date

    summary: str

    countries: List[str] = Field(default_factory=list)
    resources: List[str] = Field(default_factory=list)
    tags: List[str] = Field(default_factory=list)
    relationships: List[str] = Field(default_factory=list)

    def to_dict(self):
        return vars(self)