import asyncio
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.auth.dependencies import admin_required
from app.db.database import get_session
from app.limiter import limiter
from app.models.job_listing import JobListing, JobListingStudy, JobListingYear
from app.schemas.auth import UserResponse
from app.schemas.jobs import JobAnnouncementCreateForm
from app.utils.uploads import delete_upload, save_upload

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("")
@limiter.limit("60/minute")
async def get_jobs(request: Request, db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(JobListing)
        .options(selectinload(JobListing.years), selectinload(JobListing.studies))
        .order_by(JobListing.deadline.asc())
    )

    jobs = result.scalars().all()

    return [
        {
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "locations": job.locations,
            "job_type": job.job_type,
            "deadline": job.deadline,
            "image_url": job.image_url,
            "studies": [s.study for s in job.studies],
            "years": [y.year for y in job.years],
            "created_at": job.created_at,
        }
        for job in jobs
    ]


@router.post("/upload", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_job(
    request: Request,
    form: JobAnnouncementCreateForm = Depends(),
    db: AsyncSession = Depends(get_session),
    user: UserResponse = Depends(admin_required),
):
    """Upload new job listing."""

    image_path: str | None = None
    image_url: str | None = None

    if form.image and form.image.filename:
        category = "image"
        upload_result = save_upload(form.image, category)
        image_path = upload_result["path"]
        image_url = upload_result["url"]

    deadline_value: date | None = None
    if form.details.deadline:
        try:
            deadline_value = date.fromisoformat(form.details.deadline)
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid deadline format.",
            ) from exc

    study_values: list[str] = []

    if form.studies.study_ai:
        study_values.append("ai")
    if form.studies.study_cyber:
        study_values.append("cyber")
    if form.studies.study_software:
        study_values.append("software")

    studies = [JobListingStudy(study=s) for s in study_values]

    year_values: list[str] = []

    if form.years.year_1:
        year_values.append("1")
    if form.years.year_2:
        year_values.append("2")
    if form.years.year_3:
        year_values.append("3")
    if form.years.year_4:
        year_values.append("4")
    if form.years.year_5:
        year_values.append("5")

    years = [JobListingYear(year=y) for y in year_values]

    job = JobListing(
        title=form.details.title,
        body=form.details.body,
        link=form.details.link,
        company=form.details.company,
        locations=form.details.locations,
        job_type=form.details.job_type,
        deadline=deadline_value,
        image_path=image_path,
        image_url=image_url,
        contact_person=form.contact.person,
        contact_phone=form.contact.phone,
        contact_email=form.contact.email,
        studies=studies,
        years=years,
    )

    try:
        db.add(job)
        await db.commit()
        await db.refresh(job)
    except IntegrityError:
        await db.rollback()
        if image_path:
            delete_upload(image_path)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create job listing.",
        )

    return {
        "id": job.id,
        "title": job.title,
        "body": job.body,
        "link": job.link,
        "company": job.company,
        "locations": job.locations,
        "job_type": job.job_type,
        "deadline": job.deadline,
        "studies": study_values,
        "years": year_values,
        "image_path": job.image_path,
        "image_url": job.image_url,
        "contact_person": job.contact_person,
        "contact_phone": job.contact_phone,
        "contact_email": job.contact_email,
        "created_at": job.created_at,
        "updated_at": job.updated_at,
    }


@router.delete("/{job_id}", status_code=status.HTTP_200_OK)
@limiter.limit("60/minute")
async def delete_job(
    request: Request,
    job_id: int,
    db: AsyncSession = Depends(get_session),
    user: UserResponse = Depends(admin_required),
):
    result = await db.execute(
        select(JobListing).where(JobListing.id == job_id)
    )

    job = result.scalar_one_or_none()

    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job annonsen finnes ikke.",
        )

    image_path = job.image_path

    try:
        await db.delete(job)
        await db.commit()
    except Exception as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Kunne ikke slette jobbannonsen.",
        ) from exc

    if image_path:
        delete_upload(image_path)

    return {"detail": "Jobbannonsen ble slettet."}


@router.get("/{job_id}")
@limiter.limit("60/minute")
async def get_job(
    request: Request, job_id: int, db: AsyncSession = Depends(get_session)
):
    result = await db.execute(
        select(JobListing)
        .options(selectinload(JobListing.years), selectinload(JobListing.studies))
        .where(JobListing.id == job_id)
    )

    job = result.scalar_one_or_none()

    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Job annonsen finnes ikke."
        )

    return {
        "id": job.id,
        "title": job.title,
        "body": job.body,
        "link": job.link,
        "company": job.company,
        "locations": job.locations,
        "job_type": job.job_type,
        "deadline": job.deadline,
        "image_url": job.image_url,
        "contact_person": job.contact_person,
        "contact_phone": job.contact_phone,
        "contact_email": job.contact_email,
        "studies": [s.study for s in job.studies],
        "years": [y.year for y in job.years],
        "created_at": job.created_at,
        "updated_at": job.updated_at,
    }
