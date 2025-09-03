import datetime
import logging
import sys

import icalendar
import recurring_ical_events
from flask import Blueprint
from requests_cache import CachedResponse, CachedSession, OriginalResponse

logger: logging.Logger = logging.getLogger(__name__)
calendar_bp = Blueprint("calendarBlueprint", __name__)


class VeventDtStartEnd:
    uid: str
    dtstart: datetime.datetime
    dtend: datetime.datetime

    def __init__(self, uid: str, dtstart: datetime.datetime, dtend: datetime.datetime):
        self.uid = uid
        self.dtstart = dtstart
        self.dtend = dtend

    def is_over(self) -> bool:
        """Not currently in use."""
        # Sometimes self.dtend is a datetime.date object instead of a dateime.datetime object, so I'll make now a datetime.date object for the comparasons to not crash.
        now: datetime.date | datetime.datetime
        if type(self.dtend) is datetime.date:
            logging.debug("type of self.dtend is datetime.date")
            now = datetime.datetime.now(tz=datetime.UTC).date()
        elif type(self.dtend) is datetime.datetime:
            now = datetime.datetime.now(tz=datetime.UTC)
        else:
            raise Exception()

        if self.dtend <= now:
            return True
        elif self.dtend > now:
            return False
        else:
            raise Exception(
                "Somehow both `self.dtend < datetime.datetime.now()` and `self.dtend >= datetime.datetime.now()` where False."
            )

    def _datetime_to_str(self, d: datetime.datetime) -> str:
        return d.strftime("%Y-%m-%dT%H:%M%z")

    def get_dtstart_str(self) -> str:
        return self._datetime_to_str(self.dtstart)

    def get_dtend_str(self) -> str:
        return self._datetime_to_str(self.dtend)

    def __repr__(self) -> str:
        return f"{self.uid}: from: {self.get_dtstart_str()} to: {self.get_dtend_str()}"


class Vevent:
    uid: str
    summary: str
    description: str
    location: str
    color: str
    timeframe: VeventDtStartEnd

    def __init__(
        self, uid: str, summary: str, description: str, location: str, color: str
    ):
        self.uid = uid
        self.summary = summary
        self.description = description
        self.location = location
        self.color = color

    def embed_time(self, v: VeventDtStartEnd):
        assert self.uid == v.uid, (
            "The VeventDtStartEnd uid is not the same as the Vevent uid."
        )
        self.timeframe = v

    def to_dict(self) -> dict[str, str]:
        # This fails if timeframe is NULL!
        return {
            "uid": self.uid,
            "summary": self.summary,
            "description": self.description,
            "location": self.location,
            "color": self.color,
            "dtstart": self.timeframe.get_dtstart_str(),
            "dtend": self.timeframe.get_dtend_str(),
        }

    def __repr__(self) -> str:
        return f"{self.uid}: {self.summary}"


@calendar_bp.route("/v1/calendar", defaults={"request_timeframe": "year"})
@calendar_bp.route("/v1/calendar/<request_timeframe>")
def get_json(request_timeframe: str):
    logging.basicConfig(
        format="%(levelname)s: %(filename)s: %(funcName)s @ %(lineno)d: %(message)s",
        level="DEBUG",
    )

    def get_filter_timeframe(request_timeframe: str) -> datetime.timedelta:
        if request_timeframe not in ["year", "week", "month"]:
            logging.warning(
                "The timeframe given in the request for calendar events is not valid. Defaulting to year."
            )
            request_timeframe = "year"
        return {
            "year": datetime.timedelta(days=365),
            "month": datetime.timedelta(days=30),
            "week": datetime.timedelta(days=7),
        }[request_timeframe]

    filter_timeframe: datetime.timedelta = get_filter_timeframe(request_timeframe)

    def get_plain_ics() -> str:
        session: CachedSession = CachedSession(expire_after=datetime.timedelta(hours=1))
        calendar_request: OriginalResponse | CachedResponse = session.get(
            url="https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
        )
        # This code is untested, but the alternative is to halt and catch fire anyway.
        if not calendar_request.ok:
            logger.error(
                "Could not get calendar from url, trying to get from cache by setting expiration to 30 days."
            )
            session.cache.reset_expiration(datetime.timedelta(days=30))
            calendar_request = session.get(
                "https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
            )
            session.cache.reset_expiration(datetime.timedelta(days=30))
            if not calendar_request.ok:
                logger.fatal(
                    "Could not get response from google calendar with even expanded cache."
                )
                sys.exit()
            logger.info("Was able to use cached response older than 1 hour.")
        return calendar_request.text

    calendar = icalendar.Calendar.from_ical(get_plain_ics())

    vevents: list[Vevent] = []
    vevent_dtstart_ends: list[VeventDtStartEnd] = []

    for event in calendar.walk("VEVENT"):
        uid = str(event.get("UID"))
        data = Vevent(
            uid,
            str(event.get("SUMMARY")),
            str(event.get("DESCRIPTION")),
            str(event.get("LOCATION")),
            str(event.get("COLOR")),
        )
        vevents.append(data)
        logging.debug(f"Got event {data}")

    query = recurring_ical_events.of(calendar)
    for event in query.between(datetime.datetime.now(), filter_timeframe):
        dtstart = event.get("DTSTART")
        dtend = event.get("DTEND")
        uid = str(event.get("UID"))
        data = VeventDtStartEnd(uid, dtstart.dt, dtend.dt)
        vevent_dtstart_ends.append(data)
        logging.debug(f"Got a time period for an event {data}")

    future_json: list[dict[str, str]] = []

    for single_event_timeframe in vevent_dtstart_ends:
        for vevent in vevents:
            if vevent.uid == single_event_timeframe.uid:
                vevent.embed_time(single_event_timeframe)
                future_json.append(vevent.to_dict())

    # dict will automatically be converted to json by flask.
    return future_json
