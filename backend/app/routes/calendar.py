import datetime

import icalendar
import recurring_ical_events
import requests
from flask import Blueprint

calendar_bp = Blueprint("calendarBlueprint", __name__)


@calendar_bp.route("/api/calendar")
def get_json():
    """!
    @returns calendarOut
    @todo Make it possible to get data from multiple ics files.
    @todo Reimplement this using classes to make it work better with doxygen?
    """
    r = requests.get(
        "https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
    )
    calendar = icalendar.Calendar.from_ical(r.text)

    """A list of event descripions and a list of the times of events. This will be returned."""
    calendar_out: dict[str, dict[str, dict[str, str]]] = {"events": {}, "times": {}}

    for event in calendar.walk("VEVENT"):
        uid = str(event.get("UID"))
        data = {
            "summary": str(event.get("SUMMARY")),
            "description": str(event.get("DESCRIPTION")),
            "location": str(event.get("LOCATION")),
            "color": str(event.get("COLOR")),
        }
        calendar_out["events"][uid] = data
        if not event.get("RRULE"):
            dtstart = event.get("DTSTART")
            dtend = event.get("DTEND")
            uid = str(event.get("UID"))
            data = {
                "start": dtstart.dt.strftime("%Y-%m-%dT%H:%M%z"),
                "end": dtend.dt.strftime("%Y-%m-%dT%H:%M%z"),
            }
            calendar_out["times"][uid] = data

    query = recurring_ical_events.of(calendar)
    for event in query.between(datetime.datetime.now(), datetime.timedelta(days=365)):
        dtstart = event.get("DTSTART")
        dtend = event.get("DTEND")
        uid = str(event.get("UID"))
        data = {
            "start": dtstart.dt.strftime("%Y-%m-%dT%H:%M%z"),
            "end": dtend.dt.strftime("%Y-%m-%dT%H:%M%z"),
        }
        calendar_out["times"][uid] = data

    # dict will automatically be converted to json by flask.
    return calendar_out
