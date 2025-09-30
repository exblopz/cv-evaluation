# AI CV & Project Evaluator Backend

## Candidate Information
- **Full Name**: [Isi Nama Kamu]
- **Email Address**: [Isi Email Kamu]

## Repository Link
[GitHub Repository URL]  
*(Note: Jangan pakai kata "Rakamin" di repo/commit/documentation)*

---

## 📌 Project Overview
This backend service accepts a candidate's CV and project report, evaluates them against a job vacancy description and a standardized rubric, and returns a structured evaluation result.  

The system demonstrates:
- Backend engineering with Node.js & Express.
- AI workflow design (prompting, chaining, RAG) — currently mocked for demonstration.
- Asynchronous processing & error handling.
- Document parsing (PDF, DOCX, TXT).

---

## ⚙️ Tech Stack
- **Node.js (Express)** → Backend framework.
- **Multer** → File upload handler.
- **pdf-parse** → Extract text from PDF files.
- **mammoth** → Extract text from DOCX files.
- **UUID** → Generate unique IDs for tasks.
- **dotenv** → Environment configuration.

---

## 🚀 How to Run

1. Clone repository:
   ```bash
   git clone [your-repo-url]
   cd ai-cv-evaluator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (for future AI integration):
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start server:
   ```bash
   node src/index.js
   ```

Server will run at:  
👉 `http://localhost:3000`

---

## 📡 API Endpoints

### 1. **Upload CV + Project**
`POST /upload`  
- Form-data:
  - `cv` → file (pdf/docx/txt)
  - `project` → file (pdf/docx/txt)

Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Upload & extraction successful"
}
```

---

### 2. **Start Evaluation**
`POST /evaluate`  
Body:
```json
{ "uploadId": "123e4567-e89b-12d3-a456-426614174000" }
```

Response:
```json
{ "id": "job-uuid", "status": "queued" }
```

---

### 3. **Get Evaluation Result**
`GET /result/:id`  

Response (mocked):
```json
{
  "id": "job-uuid",
  "status": "completed",
  "result": {
    "cv_match_rate": 0.82,
    "cv_feedback": "Strong backend skills, limited AI exposure.",
    "project_score": 7.5,
    "project_feedback": "Good chaining logic but error handling is weak.",
    "overall_summary": "Solid backend candidate, needs deeper RAG knowledge."
  }
}
```

---

## 🧩 Approach & Design

### Initial Plan
- Break down requirements into 3 endpoints (`/upload`, `/evaluate`, `/result`).
- Support multiple file formats (PDF, DOCX, TXT).
- Mock AI evaluation but design pipeline to allow easy integration with OpenAI API.

### System & Database Design
- In-memory storage (`uploads`, `evaluations`) for demo purposes.
- Can be extended to MongoDB or PostgreSQL.

### Job Queue Handling
- Simulated async process using `setTimeout`.
- Returns `queued → processing → completed`.

### LLM Integration (Future)
- Designed service layer (`evaluationService.js`) to plug in LLM calls.
- Will support:
  - Prompt design.
  - LLM chaining.
  - RAG (retrieval from vector DB).

### Resilience & Error Handling
- Global error handler middleware.
- Handles missing files, invalid IDs, unsupported formats.

### Edge Cases Considered
- Invalid upload ID.
- Missing files in request.
- Unsupported file type.
- Long-running job simulation.

---

## 📊 Results & Reflection

### What Worked Well
- File upload & extraction from PDF/DOCX/TXT.
- API endpoints designed with async evaluation.
- Clear separation of concerns (controllers, services, utils).

### What Didn’t Work
- Full LLM pipeline not implemented due to API limitation (mocked instead).
- Vector DB (RAG) not integrated yet.

### Future Improvements
- Integrate with OpenAI API or Gemini for real evaluation.
- Add database (MongoDB/Postgres) for persistence.
- Implement job queue (BullMQ / RabbitMQ).
- Add authentication for secure uploads.
- Dockerize for deployment.

---

## 🌟 Bonus (Optional Features)
- Multi-file format extraction.
- Clean modular structure (controllers, services, routes).
- Ready for real AI integration.
