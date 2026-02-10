CREATE TABLE IF NOT EXISTS applied_seeds (
    filename TEXT PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT NOW()
);