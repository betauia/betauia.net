from datetime import date

from sqlalchemy import Date, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin


class JobListing(Base, TimestampMixin):
    __tablename__ = "job_listings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    link: Mapped[str | None] = mapped_column(String(1024), nullable=True)

    company: Mapped[str] = mapped_column(String(255), nullable=False)
    locations: Mapped[str] = mapped_column(String(255), nullable=False)
    job_type: Mapped[str] = mapped_column(String(50), nullable=False)

    deadline: Mapped[date | None] = mapped_column(Date, nullable=True)

    image_path: Mapped[str] = mapped_column(String(255), nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)

    contact_person: Mapped[str | None] = mapped_column(String(100), nullable=True)
    contact_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    contact_email: Mapped[str | None] = mapped_column(String(255), nullable=True)

    studies: Mapped[list["JobListingStudy"]] = relationship(
        back_populates="job_listing", cascade="all, delete-orphan"
    )
    years: Mapped[list["JobListingYear"]] = relationship(
        back_populates="job_listing", cascade="all, delete-orphan"
    )


class JobListingStudy(Base):
    __tablename__ = "job_listing_studies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    job_listing_id: Mapped[int] = mapped_column(
        ForeignKey("job_listings.id", ondelete="CASCADE"), nullable=False, index=True
    )
    study: Mapped[str] = mapped_column(String(50), nullable=False)

    job_listing: Mapped["JobListing"] = relationship(back_populates="studies")


class JobListingYear(Base):
    __tablename__ = "job_listing_years"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    job_listing_id: Mapped[int] = mapped_column(
        ForeignKey("job_listings.id", ondelete="CASCADE"), nullable=False, index=True
    )
    year: Mapped[str] = mapped_column(String(20), nullable=False)

    job_listing: Mapped["JobListing"] = relationship(back_populates="years")
