# 🚀 Dam Neural Classifier - Backend (FastAPI)

This is the backend service for the **Dam Neural Classifier**, responsible for EEG signal processing, machine learning inference, and data management.

## 🛠 Tech Stack

- **FastAPI**: High-performance web framework.
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM).
- **Alembic**: Database migrations.
- **Minio**: S3-compatible object storage for EEG files.
- **Pydantic**: Data validation and settings management.
- **Scientific Libraries**: `mne`, `numpy`, `pandas`, `scipy`, `antropy`.
- **Machine Learning**: `joblib` for loading pre-trained model pickles.

---

## 📁 Project Structure

```
be/
├── alembic/            # Database migration scripts and environment
├── app/
│   ├── api/            # Route definitions and initialization
│   │   └── routes/     # Individual route modules (jobs, health)
│   ├── core/           # Configuration management (DB, Minio)
│   ├── db/             # Database session and base models
│   ├── exceptions/     # Custom exception handlers
│   ├── model/          # ML logic and pre-trained pickle files
│   ├── schemas/        # Pydantic models for request/response validation
│   ├── services/       # Core business logic
│   │   ├── jobs/       # ETL and Prediction pipeline (extractor, predictor, etc.)
│   │   └── storage/    # Minio storage service interface
│   └── temp/           # Temporary directory for file processing
├── main.py             # FastAPI entry point
├── requirements.txt    # Python dependencies
└── alembic.ini        # Alembic configuration
```

---

## ⚙️ Local Development

### Prerequisites
- Python 3.11+
- PostgreSQL instance
- Minio instance

### Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Variables:**
   Create a `.env` file in the `be/` directory (refer to `.env.example` if available or the root README):
   ```env
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
   MINIO_ENDPOINT=localhost:9000
   MINIO_ACCESS_KEY=minioadmin
   MINIO_SECRET_KEY=minioadmin
   MINIO_BUCKET_NAME=eeg-data-bucket
   MINIO_SECURE=False
   ```

4. **Run the application:**
   ```bash
   uvicorn main:app --reload
   ```

---

## 📊 API Documentation

Once the server is running, you can access the interactive API documentation:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🧬 Signal Processing Pipeline

The backend implements a multi-stage pipeline for EEG analysis:
1. **Loader:** Retrieves data from Minio.
2. **Extractor:** Parses raw EEG formats.
3. **Preprocessor:** Cleans and filters signals.
4. **Segmentor:** Breaks signals into manageable epochs.
5. **Predictor:** Runs features through the pre-trained classification models.

---

## 👤 Author

**Adam Andana Putra**
- GitHub: [https://github.com/adamandp](https://github.com/adamandp)
- Email: [adamanandaputra@gmail.com](mailto:adamanandaputra@gmail.com)
