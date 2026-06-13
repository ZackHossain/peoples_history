from dataclasses import dataclass


@dataclass
class Resource:
    uuid: str

    title: str
    author: str

    source: str
    link: str

    resource_type: str

    summary: str

    def to_dict(self):
        return vars(self)