import datetime
import logging
import sys

import icalendar
import recurring_ical_events
from flask import Blueprint
from requests_cache import CachedSession

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

    def isOver(self) -> bool:
        """Not currently in use."""
        # Sometimes self.dtend is a datetime.date object instead of a dateime.datetime object, so I'll make now a datetime.date object for the comparasons to not crash.
        now: datetime.date | datetime.datetime
        if type(self.dtend) == datetime.date:
            logging.debug("type of self.dtend is datetime.date")
            now = datetime.datetime.now(tz=datetime.UTC).date()
        elif type(self.dtend) == datetime.datetime:
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

    def _datetimeToStr(self, d: datetime.datetime) -> str:
        return d.strftime("%Y-%m-%dT%H:%M%z")

    def getDtStartStr(self) -> str:
        return self._datetimeToStr(self.dtstart)

    def getDtEndStr(self) -> str:
        return self._datetimeToStr(self.dtend)

    def __repr__(self) -> str:
        return f"{self.uid}: from: {self.getDtStartStr()} to: {self.getDtEndStr()}"


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

    def embedTime(self, v: VeventDtStartEnd):
        assert self.uid == v.uid, (
            "The VeventDtStartEnd uid is not the same as the Vevent uid."
        )
        self.timeframe = v

    def toDict(self) -> dict[str, str]:
        # This fails if timeframe is NULL!
        return {
            "uid": self.uid,
            "summary": self.summary,
            "description": self.description,
            "location": self.location,
            "color": self.color,
            "dtstart": self.timeframe.getDtStartStr(),
            "dtend": self.timeframe.getDtEndStr(),
        }

    def __repr__(self) -> str:
        return f"{self.uid}: {self.summary}"


@calendar_bp.route("/v1/calendar", defaults={"requestTimeframe": "year"})
@calendar_bp.route("/v1/calendar/<requestTimeframe>")
def get_json(requestTimeframe: str):
    logging.basicConfig(
        format="%(levelname)s: %(filename)s: %(funcName)s @ %(lineno)d: %(message)s",
        level="DEBUG",
    )

    def getFilterTimeframe(requestTimeframe: str) -> datetime.timedelta:
        if requestTimeframe not in ["year", "week", "month"]:
            logging.warning(
                "The timeframe given in the request for calendar events is not valid. Defaulting to year."
            )
            requestTimeframe = "year"
        return {
            "year": datetime.timedelta(days=365),
            "month": datetime.timedelta(days=30),
            "week": datetime.timedelta(days=7),
        }[requestTimeframe]

    filterTimeframe: datetime.timedelta = getFilterTimeframe(requestTimeframe)

    def get_plain_ics() -> str:
        session: CachedSession = CachedSession(expire_after=datetime.timedelta(hours=1))
        r = session.get(
            "https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
        )
        if not r.ok:
            logger.warning(
                "Could not get calendar from url, trying to get from cache by setting expiration to 30 days."
            )
            session.cache.reset_expiration(datetime.timedelta(days=30))
            r = session.get(
                "https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
            )
            session.cache.reset_expiration(datetime.timedelta(days=30))
            if not r.ok:
                logger.fatal(
                    "Could not get response from google calendar with even expanded cache."
                )
                sys.exit()
        return r.text

    calendar = icalendar.Calendar.from_ical(get_plain_ics())

    vevents: list[Vevent] = []
    veventDtSTartEnds: list[VeventDtStartEnd] = []

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
    for event in query.between(datetime.datetime.now(), filterTimeframe):
        dtstart = event.get("DTSTART")
        dtend = event.get("DTEND")
        uid = str(event.get("UID"))
        data = VeventDtStartEnd(uid, dtstart.dt, dtend.dt)
        veventDtSTartEnds.append(data)
        logging.debug(f"Got a time period for an event {data}")

    futureJson: list[dict[str, str]] = []

    for singleEventTimeframe in veventDtSTartEnds:
        for vevent in vevents:
            if vevent.uid == singleEventTimeframe.uid:
                vevent.embedTime(singleEventTimeframe)
                futureJson.append(vevent.toDict())

    # dict will automatically be converted to json by flask.
    return futureJson
