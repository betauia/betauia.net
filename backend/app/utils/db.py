from app.config import Config
from app.models import ArneFact
from .extensions import db

def clean_all_data():
    """
    Drops and re-creates all tables.

    Resets the entire database by dropping and re-creating every table for development or testing only.
    """

    print("Dropping all tables...")
    db.drop_all()

    print("Creating all tables...")
    db.create_all()

    print("Tables reinitialized.")


def insert_dummy_data():
    """
    Inserts dummy data into tables.

    This data is meant for development and testing, and should not be in production.

    Process:
        1. Checks if there is any data in table.
        2. If the table is empty, it populates it.
        3. If not, it skips inserting to the table.
    """
    
    print("Inserting dummy data into the tables...")

    if ArneFact.query.count() == 0:
        news = [
            "Arne Wiklund spotted scrumming on Mars, planning his hometrip next Friday.",
            "Fossils of giant ducks discovered by Arne Wiklund on Mars, the Otters are in shock.",
            "Rocket sending Arne Wiklund back from Mars will have space pirate protection.",
            "Space karaoke on Mars has Arne Wiklund's favorite songs.",
            "Arne Wiklund teaches the Otters the art of synchronized swimming.",
            "The Otters protest after Arne Wiklund replaces all Otter flags with giant rubber ducks.",
            "After spending a month on Mars, Arne Wiklund declares the Otters' potatoes taste better than Earth’s variety.",
            "Arne Wiklund convinces the Otters to start an annual 'space salsa' competition that has become a galactic sensation.",
            "The Otters form a band called 'The Otter-side,' with Arne Wiklund as the lead singer, and they’re now touring the solar system.",
            "Arne Wiklund sets up a food truck on Mars, but only serves 'space potatoes' grown by the Otters - business is booming.",
            "Arne Wiklund's Mars mission is now the subject of a new hit reality show, 'The Otterverse,' where he and the Otters navigate interplanetary shenanigans.",
            "Potatoes on Mars grow to an enormous size after being exposed to radiation, and Arne Wiklund leads a team of Otters to build a new rubber duck skyscraper out of them.",
            "Arne Wiklund discovers that potatoes from Mars have the ability to communicate through telepathy, and they begin to lecture him on the meaning of life.",
            "Arne Wiklund attempts to introduce the new course called 'MRS101 - Potato Farming 101' at UiA, but gets sabbotaged by the Otters.",
        ]

        facts = [ArneFact(fact=entry) for entry in news]

        db.session.add_all(facts)
        db.session.commit()

        print("Inserted dummy data into 'arne_facts'.")
    else:
        print("Data already exists in 'arne_facts'. Skipping insertion.")

