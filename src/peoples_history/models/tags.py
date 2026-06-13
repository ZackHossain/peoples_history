from dataclasses import dataclass


@dataclass
class Tag:
    uuid: str
    title: str

    def to_dict(self):
        return vars(self)