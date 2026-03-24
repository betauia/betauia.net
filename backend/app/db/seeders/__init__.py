from app.db.seeders.job_listing_seed import JobListingSeeder
from app.db.seeders.user_seed import UserSeeder

seeders = [UserSeeder(), JobListingSeeder()]
