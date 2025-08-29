import datetime
import logging

import icalendar
import recurring_ical_events
import requests
from flask import Blueprint

logger:logging.Logger = logging.getLogger(__name__)
calendar_bp = Blueprint("calendarBlueprint", __name__)

class VeventDtStartEnd:
    uid:str
    dtstart:datetime.datetime
    dtend:datetime.datetime

    def __init__(self, uid:str, dtstart:datetime.datetime, dtend:datetime.datetime):
        self.uid=uid
        self.dtstart=dtstart
        self.dtend=dtend

    def isOver(self)->bool:
        #Sometimes self.dtend is a datetime.date object instead of a dateime.datetime object, so I'll make now a datetime.date object for the comparasons to not crash.
        now:datetime.date|datetime.datetime
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
            raise Exception("Somehow both `self.dtend < datetime.datetime.now()` and `self.dtend >= datetime.datetime.now()` where False.")
        
    def _datetimeToStr(self, d:datetime.datetime)->str:
        return d.strftime("%Y-%m-%dT%H:%M%z")
    
    def getDtStartStr(self)->str:
        return self._datetimeToStr(self.dtstart)
    
    def getDtEndStr(self)->str:
        return self._datetimeToStr(self.dtend)
    
    def __repr__(self)->str:
        return f"{self.uid}: from: {self.getDtStartStr()} to: {self.getDtEndStr()}"


class Vevent:
    uid:str
    summary:str
    description:str
    location:str
    color:str
    timeframe:VeventDtStartEnd

    def __init__(self, uid:str, summary:str, description:str, location:str, color:str):
        self.uid = uid
        self.summary = summary
        self.description = description
        self.location = location
        self.color = color

    def embedTime(self, v:VeventDtStartEnd):
        assert self.uid == v.uid, "The VeventDtStartEnd uid is not the same as the Vevent uid."
        self.timeframe = v

    def toDict(self)->dict[str,str]:
        #This fails if timeframe is NULL!
        return { "uid":self.uid,
                "summary":self.summary,
                "description":self.description,
                "location":self.location,
                "color":self.color,
                "dtstart":self.timeframe.getDtStartStr(),
                "dtend":self.timeframe.getDtEndStr()}
    
    def __repr__(self)->str:
        return f"{self.uid}: {self.summary}"

@calendar_bp.route("/v1/calendar")
def get_json():
    """!
    @returns calendarOut
    @todo Make it possible to get data from multiple ics files.
    @todo Reimplement this using classes to make it work better with doxygen?
    """
    logging.basicConfig(format="%(levelname)s: %(filename)s: %(funcName)s @ %(lineno)d: %(message)s",level="DEBUG")

    r = requests.get(
        "https://calendar.google.com/calendar/ical/tfovkufa1g4bflfg2oo8j4798k@group.calendar.google.com/public/basic.ics"
    )
    calendar = icalendar.Calendar.from_ical(r.text)

    #"""A list of event descripions and a list of the times of events. This will be returned."""
    #calendar_out = {"events": {}, "times": {}}
    vevents:dict[str, Vevent] = {}
    veventDtSTartEnds:list[VeventDtStartEnd] = []

    for event in calendar.walk("VEVENT"):
        uid = str(event.get("UID"))
        data = Vevent(
            uid,
            str(event.get("SUMMARY")),
            str(event.get("DESCRIPTION")),
            str(event.get("LOCATION")),
            str(event.get("COLOR")),
        )
        vevents[uid]=data

        # As it turn out `recurring_ical_events.of(calendar)` does include one off events, so we don't have to do seperate processing for them.
        # What happens in the code block below is enough.
        # The code below also filters away bygone events so I don't have to check VeventDtSTartEnd.isOver()
        # if not event.get("RRULE"):
        #     dtstart = event.get("DTSTART")
        #     dtend = event.get("DTEND")
        #     uid = str(event.get("UID"))
        #     data = VeventDtStartEnd(
        #         uid,
        #         dtstart.dt,
        #         dtend.dt,
        #     )
        #     veventDtSTartEnds.append(data)
        #     logging.debug("Got a time period for an event {}".format(data))

    query = recurring_ical_events.of(calendar)
    for event in query.between(datetime.datetime.now(), datetime.timedelta(days=365)):
        dtstart = event.get("DTSTART")
        dtend = event.get("DTEND")
        uid = str(event.get("UID"))
        data = VeventDtStartEnd(
            uid,
            dtstart.dt,
            dtend.dt,
        )
        veventDtSTartEnds.append(data)
        logging.debug("Got a time period for an event {}".format(data))

    futureJson:dict[str, dict[str,str]] ={}
    for timeframe in veventDtSTartEnds:
        if not timeframe.isOver():
            vevents[timeframe.uid].embedTime(timeframe)
            futureJson[timeframe.uid] = (vevents[timeframe.uid].toDict())
        elif timeframe.isOver():
            logging.debug(f"Removed {vevents.get(timeframe.uid)}, because it's over allready.")
            vevents.pop(timeframe.uid)
        else:
            raise Exception

    # dict will automatically be converted to json by flask.
    return futureJson