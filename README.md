# 🧠 Dam Neural Classifier (Full Stack)

## 📌 Overview

**Dam Neural Classifier** is a full-stack web application designed for the classification and analysis of EEG brain signal data. It predicts neurological conditions such as **Normal**, **Mild Cognitive Impairment (MCI)**, and **Alzheimer’s Disease** using machine learning models integrated into a robust FastAPI backend.

The system is built with a modern architecture that handles data storage, signal processing, and real-time visualization.

---

## 🏗 Architecture

The project follows a distributed architecture to ensure scalability and separation of concerns:

- **Frontend:** Next.js (TypeScript) with Tailwind CSS and Radix UI for a responsive, interactive user experience.
- **Backend:** FastAPI (Python) for high-performance signal processing and ML model inference.
- **Database:** PostgreSQL for storing job metadata, user data, and classification results.
- **Object Storage:** Minio (S3-compatible) for managing large EEG signal files.
- **Orchestration:** Docker Compose for seamless deployment of all services.

---

## 🛠 Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs.
- **SQLAlchemy & Alembic**: Database ORM and migration management.
- **Minio Python SDK**: Interface for object storage.
- **ML/Signal Libraries**: `mne`, `antropy`, `numpy`, `pandas`, `scipy`, and `joblib`.
- **Pydantic Settings**: Centralized configuration management.

### Frontend
- **Next.js 15+**: React framework with App Router.
- **TanStack Query**: State management and efficient data fetching.
- **Axios**: API communication.
- **Lucide React & Recharts**: Icons and data visualization.

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and Docker Compose.
- (Optional) [Node.js 20+](https://nodejs.org/) and [Python 3.11+](https://www.python.org/) for local development without Docker.

### Quick Start (Recommended)
The easiest way to run the entire stack is using Docker Compose:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adamandp/dam-neural-classifier.git
   cd dam-neural-classifier
   ```

2. **Run with Docker Compose:**
   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8000/docs](http://localhost:8000/docs) (Interactive Swagger UI)
   - **Minio Console:** [http://localhost:9001](http://localhost:9001) (User: `minio_admin` / Pass: `minio_password_123`)

---

## ⚙️ Configuration

### Environment Variables

The project uses environment variables for service discovery and secrets. These are pre-configured in `docker-compose.yml` for the standard setup.

| Variable | Description | Default (Docker) |
|----------|-------------|------------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://final_user:final_pass@db:5432/final_assignment_db` |
| `MINIO_ENDPOINT` | Minio API endpoint | `minio:9000` |
| `MINIO_ACCESS_KEY`| Minio root user | `minio_admin` |
| `MINIO_SECRET_KEY`| Minio root password | `minio_password_123` |
| `NEXT_PUBLIC_API_URL`| Frontend API endpoint | `http://localhost:8000` |

---

## 📁 Project Structure

```
.
├── be/                 # Backend (FastAPI)
│   ├── app/            # Application logic
│   │   ├── api/        # API Routes
│   │   ├── core/       # Configurations
│   │   ├── db/         # Database models & sessions
│   │   ├── model/      # ML Pickles and logic
│   │   └── services/   # Business logic (Jobs, Storage)
│   ├── alembic/        # DB Migrations
│   └── main.py         # Entry point
├── fe/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/        # App Router
│   │   ├── components/ # UI Components
│   │   ├── hooks/      # Custom Hooks
│   │   └── utils/      # API Clients & Helpers
├── docker-compose.yml  # Infrastructure orchestration
└── README.md           # This guide
```

---

## 💡 Best Practices

### Development
1. **Surgical Updates:** When modifying code, stick to the scope of the feature or bug fix. Avoid unrelated refactoring.
2. **Type Safety:** Use TypeScript in the frontend and Pydantic models in the backend to ensure data integrity.
3. **Environment Isolation:** Never hardcode secrets. Always use `.env` files or environment variables.

### Git & Workflow
1. **Meaningful Commits:** Use descriptive commit messages (e.g., `feat: add signal preprocessor`, `fix: cors issue on port 3000`).
2. **Branching:** Use feature branches (`feature/add-classification-logic`) instead of committing directly to `main`.

### Performance & Security
1. **Database Connections:** Always use dependency injection (`get_db`) to manage database sessions and ensure they are closed properly.
2. **CORS Policy:** Restrict allowed origins in production. The current setup allows `localhost:3000` for development.
3. **Large File Handling:** EEG data can be large. Use Minio's presigned URLs for efficient uploads/downloads.

---

## 👤 Author

**Adam Andana Putra**
- GitHub: [https://github.com/adamandp](https://github.com/adamandp)
- Email: [adamanandaputra@gmail.com](mailto:adamanandaputra@gmail.com)

---

## 📄 License

This project is intended for educational and experimental purposes. See individual service folders for more details.
