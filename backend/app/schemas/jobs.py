from fastapi import Depends, File, Form, UploadFile


class JobDetailsForm:
    def __init__(  # noqa: PLR0913
        self,
        title: str = Form(...),
        body: str = Form(...),
        link: str | None = Form(None),
        company: str = Form(...),
        locations: str = Form(...),
        job_type: str = Form(...),
        deadline: str | None = Form(None),
    ):
        self.title = title
        self.body = body
        self.link = link
        self.company = company
        self.locations = locations
        self.job_type = job_type
        self.deadline = deadline


class JobContactInfoForm:
    def __init__(
        self,
        person: str | None = Form(None),
        phone: str | None = Form(None),
        email: str | None = Form(None),
    ):
        self.person = person
        self.phone = phone
        self.email = email


class JobStudiesForm:
    def __init__(
        self,
        study_ai: bool = Form(False),
        study_cyber: bool = Form(False),
        study_software: bool = Form(False),
    ):
        self.study_ai = study_ai
        self.study_cyber = study_cyber
        self.study_software = study_software


class JobYearsForm:
    def __init__(  # noqa: PLR0913
        self,
        year_1: bool = Form(False),
        year_2: bool = Form(False),
        year_3: bool = Form(False),
        year_4: bool = Form(False),
        year_5: bool = Form(False),
        year_all: bool = Form(False),
    ):
        self.year_1 = year_1
        self.year_2 = year_2
        self.year_3 = year_3
        self.year_4 = year_4
        self.year_5 = year_5
        self.year_all = year_all


class JobAnnouncementCreateForm:
    def __init__(
        self,
        details: JobDetailsForm = Depends(),
        contact: JobContactInfoForm = Depends(),
        studies: JobStudiesForm = Depends(),
        years: JobYearsForm = Depends(),
        image: UploadFile = File(...),
    ):
        self.details = details
        self.contact = contact
        self.studies = studies
        self.years = years
        self.image = image
