from dataclasses import dataclass, field
from typing import List


@dataclass
class Event:
    uuid: str
    name: str

    start_date: str
    end_date: str

    summary: str

    countries: List[str] = field(default_factory=list)
    resources: List[str] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    relationships: List[str] = field(default_factory=list)

    def to_dict(self):
        return vars(self)