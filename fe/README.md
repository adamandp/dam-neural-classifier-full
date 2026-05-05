# 🧠 Dam Neural Classifier

## 📌 Overview

**Dam Neural Classifier** is a web-based application designed to classify brain signal data into clinical diagnostic categories. The system analyzes input signals and predicts whether the condition belongs to one of the following classes:

- **Normal**
- **Mild Cognitive Impairment (MCI)**
- **Alzheimer’s Disease**

This project aims to support early-stage experimentation and analysis in neurological condition classification using modern web technologies.

---

## 🎯 Purpose

The primary goal of this project is to provide an interactive interface for visualizing and classifying brain signal data. It can be used for:

- Research prototyping
- Model integration testing
- Educational purposes in healthcare and machine learning domains

---

## 🛠 Tech Stack

### Frontend

- **Next.js** – React framework for building fast and scalable web applications

### Styling

- **Tailwind CSS** – Utility-first CSS framework
- **shadcn/ui** – Reusable and accessible UI components

### Tools & Libraries

- **TanStack Query** – Data fetching, caching, and state management
- **Axios** – Promise-based HTTP client for API communication

---

## ✨ Features

- 📱 **Responsive Design**
  Optimized for various screen sizes, from mobile to desktop

- 🌙 **Dark Mode Support**
  Built-in theme switching for better user experience in low-light environments

- ⚡ **Efficient Data Fetching**
  Leveraging TanStack Query for caching and synchronization

---

## ⚙️ Installation & Setup

This project can be run using either **Docker** or **PNPM**, depending on your preferred workflow.

---

## ▶️ How to Run

### 🐳 Run with Docker

Make sure Docker is installed on your system.

```bash
# Build the Docker image
docker build -t dam-neural-classifier .

# Run the container
docker run -p 3000:3000 dam-neural-classifier
```

Open your browser and navigate to:

```
http://localhost:3000
```

---

### 📦 Run with PNPM

Make sure **Node.js** and **pnpm** are installed.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open:

```
http://localhost:3000
```

---

## 🌐 Deployment

The application is deployed on **Vercel**:

- 🔗 **Live Application**
  [https://dam-neural-classifier.vercel.app/](https://dam-neural-classifier.vercel.app/)

- 💻 **Source Code**
  [https://github.com/adamandp/dam-neural-classifier](https://github.com/adamandp/dam-neural-classifier)

---

## 📁 Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, routing logic)
├── components/    # Reusable UI components
│   ├── icon/      # Custom icon components
│   └── ui/        # Base UI components (shadcn-based)
├── hooks/         # Custom React hooks
├── lib/           # Core utilities, API configs, and shared logic
├── providers/     # Context providers (theme, query client, etc.)
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
```

---

## 🚧 Future Improvements

- Integration with real machine learning models
- Upload and processing of real brain signal datasets
- Improved data visualization (charts, signal graphs)
- Better error handling and loading states

---

## 👤 Author

**Adam Andana Putra**

- GitHub: [https://github.com/adamandp](https://github.com/adamandp)
- Email: [adamanandaputra@gmail.com](mailto:adamanandaputra@gmail.com)

---

## 📄 License

This project is intended for educational and experimental purposes.
You are free to use, modify, and distribute it as needed.

---
