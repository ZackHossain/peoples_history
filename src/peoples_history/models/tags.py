from pydantic import BaseModel, Field
from typing import List, Optional

class Tag(BaseModel):
    uuid: Optional[str]
    title: str

    def to_dict(self):
        return vars(self)