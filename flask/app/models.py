from . import db
from sqlalchemy.sql import func


class Organizers(db.Model):
    __tablename__ = "Organisers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    #events = db.relationship("Events", backref="Organizers")

    def __repr__(self):
        return f"<Organizer {self.id}, {self.name}>"


class Events(db.Model):
    __tablename__ = "Events"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    #organizer_id = db.Column(db.Integer, db.ForeignKey("Organizers.id"))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    @property
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at,
        }

    def __repr__(self):
        return f"<Events {self.id}, {self.title}>"
