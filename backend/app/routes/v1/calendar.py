import datetime

import icalendar
import recurring_ical_events
import requests
from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import Config

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.get("/calendar")
@limiter.limit("30/minute")
def get_calendar(request: Request):
    """
    Fetch and parse calendar events from Google Calendar ICS feed

    TODO:
        Make it possible to get data from multiple ics files.
        Reimplement this using classes to make it work better with doxygen?
    """
    r = requests.get(Config.CALENDAR_ICS_URL)
    calendar = icalendar.Calendar.from_ical(r.text)

    calendar_out: dict[str, dict] = {"events": {}, "times": {}}

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

    return calendar_out
