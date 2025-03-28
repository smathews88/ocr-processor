# --- README.md ---
cat <<EOL > README.md
# 🧠 OCR Processor

A microservice for processing image, PDF, and DOCX files using OCR (Tesseract.js) with Kafka-based job ingestion.

---

## 📦 Tech Stack

- **Node.js** (Express) – REST API
- **Tesseract.js** – OCR engine
- **KafkaJS** – Kafka producer & consumer
- **Docker** – Containerization
- **Multer** – File upload
- **PDF-Parse & Mammoth** – PDF/DOCX support

---

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- `kafka-broker-local` project in a separate folder to run Kafka + Zookeeper

---

## 🧱 Run Kafka Broker (in separate project)

1. Go to your Kafka folder:

```bash
cd ../kafka-broker-local
docker-compose up -d
```

2. (Optional) Create the topic manually:

```bash
docker exec -it kafka /bin/bash

# Inside container
kafka-topics --create \
  --topic ocr.jobs \
  --bootstrap-server localhost:9092 \
  --replication-factor 1 \
  --partitions 1
```

---

## 🚀 Getting Started (OCR Processor)

### Install dependencies:

```bash
cd ocr-processor
npm install
```

### Start the Kafka Consumer:

```bash
npm run consumer
```

> Listens to `ocr.jobs` and performs OCR on uploaded files.

### Run Kafka Producer (Test)

Ensure you have a file like `uploads/sample.pdf`:

```bash
node src/consumers/kafka.producer.js
```

This will send a test job to `ocr.jobs` and trigger OCR processing.

---

## 📂 Project Structure

```
ocr-processor/
├── uploads/           # Upload directory
├── src/
│   ├── consumers/     # Kafka consumer & producer
│   ├── controllers/   # Express route controllers
│   ├── routes/        # API routes
│   ├── services/      # Tesseract OCR logic
│   └── utils/         # File upload helper
├── Dockerfile
├── .gitignore
├── .dockerignore
└── package.json
```

---

## ✅ Example Output (Consumer)

```bash
📩 Received message: { contractId: 'test123', ... }
✅ OCR for contract test123: Lorem ipsum dolor...
📄 Full OCR content: ...
```
EOL

# --- Final message ---
echo "✅ OCR Processor project scaffold created with code, Docker, Git, CI/CD, Kafka consumer, Kafka producer, and README.md."
