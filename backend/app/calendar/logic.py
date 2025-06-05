from flask import Blueprint
import icalendar, recurring_ical_events, datetime, requests

calendarBlueprint = Blueprint("calendarBlueprint",__name__)

@calendarBlueprint.route("/api/calendar")
def getJson() -> dict[str,dict]:
    """!
    @returns calendarOut
    @todo Make it possible to get data from multiple ics files.
    @todo Reimplement this using classes to make it work better with doxygen?
    """
    r = requests.get("https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics")
    calendar = icalendar.Calendar.from_ical(r.text)

    """A list of event descripions and a list of the times of events. This will be returned."""
    calendarOut:dict[str,dict] = {"events":{}, "times":{}}

    for event in calendar.walk("VEVENT"):
        uid = str(event.get("UID"))
        data = {"summary":     str(event.get("SUMMARY")),
                "description": str(event.get("DESCRIPTION")),
                "location":    str(event.get("LOCATION")),
                "color":       str(event.get("COLOR"))}
        calendarOut["events"][uid] = data
        if not event.get("RRULE"):
            DTSTART = event.get("DTSTART")
            DTEND = event.get("DTEND")
            uid = str(event.get("UID"))
            data = {"start": DTSTART.dt.strftime("%Y-%m-%dT%H:%M%z"),
                    "end":   DTEND.dt.strftime("%Y-%m-%dT%H:%M%z")}
            calendarOut["times"][uid]=data

    query=recurring_ical_events.of(calendar)
    for event in query.between(datetime.datetime.now(),datetime.timedelta(days=365)):
        DTSTART = event.get("DTSTART")
        DTEND = event.get("DTEND")
        uid = str(event.get("UID"))
        data = {"start": DTSTART.dt.strftime("%Y-%m-%dT%H:%M%z"),
                "end":   DTEND.dt.strftime("%Y-%m-%dT%H:%M%z")}
        calendarOut["times"][uid]=data

    #dict will automatically be converted to json by flask.
    return calendarOut