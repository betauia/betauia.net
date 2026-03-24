from datetime import date, timedelta

from sqlalchemy import delete

from app.db.seeders.base import Seeder
from app.models.job_listing import JobListing, JobListingStudy, JobListingYear


class JobListingSeeder(Seeder):
    name = "job_listing_seed"

    async def run(self, session):
        await session.execute(delete(JobListingYear))
        await session.execute(delete(JobListingStudy))
        await session.execute(delete(JobListing))

        deadline = date.today() + timedelta(days=42)

        markdown_body = """# 🏴‍☠️ Ahoi, skattejegere!

## Om AfDP

**Dyreparken AfDP** (Avdeling for Digital Piratering) søker en kløpper av en **Python-pirat** til vårt crew! 

Vi bygger backend-systemer som faktisk plyndrer data og lager ordenlige API-er som kan tåle en storm. P-arr-thon er selvfølgelig det eneste språket verdig en skikkelig sjørøver! 🐍

## Hvem vi leter etter

- Du kan Python, Flask/FastAPI og er ikke redd for å seile i Django-farvann
- Du har kanskje rørt ved Rust også (for når vi trenger FART)
- Git er ikke bare versjonstyring - det er hvordan vi deler skatten
- Docker containers? Vi kaller dem skattekister
- PostgreSQL/Redis - du vet hvordan man lagrer bytte ordentlig

## Hva du skal drive med

**Prosjekt Sabletann 2.0**: Rebuilde hele booking-systemet for parken. Legacy PHP-koden fra 2007 må dø.

**Skattekart API**: Sanntids-tracking av gjester i parken via app. Big Brother, men med papegøyer.

**Maga Khan Revenge**: AI-system som predikerer køtider og selger Express-pass når folk er mest desperate. Rent digitalt ran!

**Kapteinsabletanns Plunder**: Backend for online merch-shop. Automatisk prisjustering basert på etterspørsel (dynamisk plyndring).

## Vi tilbyr

- 🦜 Papegøye på skulderen (de debugger faktisk ganske bra)
- 💰 Lønn i kroner + bonus ved successful deployments
- 🏴‍☠️ Alle pirathøytider er helligdager
- 🍕 Pizza hver fredag (Pinky velger topping)
- 🎢 Årspass + bring din egen crew
- 💻 Valgfritt utstyr (M3 Max eller du får skeive blikk)

## Arbeidsmiljø

Vi er 6 backendbajaser, 2 DevOps-sjørøvere og Langemann (som mest ser på). Kontoret ligger ved parken, men remote er greit når man ikke føler for småpraten.

Stack: Python 3.12+, FastAPI, PostgreSQL, Redis, Docker, K8s. Alt hostet på DigitalOcean.

Ingen møter etter 15:00. Ingen Scrum Masters. Ingen tull.

## Søk nå!

Send CV på mail, og skriv noe morsomt i subject line eller bli ignorert.

*P.S. GitHub-profilen din forteller mer enn tusde CV-er. Vis oss koden din, pirat!*

**Arr!** 🏴‍☠️
"""

        job = JobListing(
            title="Kaptein Sabeltann søker utviklere",
            body=markdown_body,
            link="https://www.dyreparken.no/opplevelser/kaptein-sabeltann-forestilling/",
            company="Dyreparken AfDP",
            locations="Abra Havn",
            job_type="full-time",
            deadline=deadline,
            contact_person="Langemann",
            contact_phone="+47 38 04 97 00",
            contact_email="ahoi@kapteinsabletann.no",
        )

        session.add(job)
        await session.flush()

        studies = [
            JobListingStudy(job_listing_id=job.id, study="ai"),
            JobListingStudy(job_listing_id=job.id, study="software"),
        ]

        years = [
            JobListingYear(job_listing_id=job.id, year="1"),
            JobListingYear(job_listing_id=job.id, year="2"),
            JobListingYear(job_listing_id=job.id, year="3"),
            JobListingYear(job_listing_id=job.id, year="4"),
            JobListingYear(job_listing_id=job.id, year="5"),
        ]

        session.add_all(studies)
        session.add_all(years)
