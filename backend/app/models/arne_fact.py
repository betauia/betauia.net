from sqlalchemy.sql import func
import random

from app.utils.extensions import db

class ArneFact(db.Model):
    __tablename__ = "arne_facts"
    id = db.Column(db.Integer, primary_key=True)
    fact = db.Column(db.Text)

    def __repr__(self):
        return f"<ArneFact {self.fact}>"

    @staticmethod
    def get_random_fact():
        return ArneFact.query.order_by(func.random()).first()
