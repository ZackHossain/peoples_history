from dataclasses import dataclass


@dataclass
class Relationship:
    uuid: str

    source_uuid: str
    target_uuid: str

    relationship_type: str

    summary: str

    def to_dict(self):
        return vars(self)