from enum import Enum

class EventType(str, Enum):
    REVOLUTION = "Revolution"
    BOURGEOIS_REVOLUTION = "Bourgeois Revolution"
    ANTI_COLONIAL = "Anti-Colonial Struggle"
    WAR = "War"
    COUNTER_REVOLUTION = "Counter Revolution"
    MASS_RADICALISATION = "Mass Radicalisation"
    WORKERS_STATE = "Workers State"
    SIGNIFICANT_MOMENT = "Significant Moment"
    GENERAL_INFO = "General Info"
    STRIKE = "Strike"
    