import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

# Current file:
# backend/app/core/database.py
#
# parents[0] -> backend/app/core
# parents[1] -> backend/app
# parents[2] -> backend

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


# --------------------------------------------------
# Database configuration
# --------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL", "").strip()

if not DATABASE_URL:
    raise ValueError(
        f"DATABASE_URL not found. Expected a valid DATABASE_URL in: {ENV_FILE}"
    )


# --------------------------------------------------
# SQLAlchemy engine
# --------------------------------------------------

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=5,
    max_overflow=10,
    connect_args={





        
        "connect_timeout": 10,
    },
)


# --------------------------------------------------
# Database session
# --------------------------------------------------

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)


# --------------------------------------------------
# SQLAlchemy base class
# --------------------------------------------------

class Base(DeclarativeBase):
    pass


# --------------------------------------------------
# FastAPI database dependency
# --------------------------------------------------

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()