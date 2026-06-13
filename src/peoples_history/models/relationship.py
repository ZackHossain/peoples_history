from pydantic import BaseModel, Field
from typing import List, Optional

class Relationship(BaseModel):
    uuid: Optional[str]
    
    source_uuid: str
    target_uuid: str

    relationship_type: str

    summary: str

    def to_dict(self):
        return vars(self)