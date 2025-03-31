from sqlalchemy.sql import func
import random

from app.utils.extensions import db

class ArneFact(db.Model):
    """
    Model to store 'facts' about Arne in the DB.
    
    Attributes:
        id (int): Unique identifier (PK).
        fact (str): Text of the fact.

    Static Methods:
        get_random_fact: Retrieves a random fact from DB.
    """

    __tablename__ = "arne_facts"

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    fact = db.Column(db.Text)

    def __repr__(self):
        return f"<ArneFact {self.fact}>"

    @staticmethod
    def get_random_fact():
        """
        Retrieves a random fact from 'arne_facts' table.

        Returns:
            ArneFact: A random ArneFact.
        """
        return ArneFact.query.order_by(func.random()).first()
