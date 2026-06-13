from pydantic import BaseModel, Field
from typing import List, Optional

class Resource(BaseModel):
    uuid: Optional[str]

    title: str
    author: str

    source: str
    link: Optional[str]

    resource_type: str

    summary: str

    def to_dict(self):
        return vars(self)