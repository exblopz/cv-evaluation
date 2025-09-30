# AI CV Evaluator (Mini Project - Backend)

Backend service to upload CV & project report, evaluate them using a real LLM (OpenRouter), and fetch the results.  


## Features
- Upload CV (PDF/DOCX/TXT) and Project Report.  
- Extract text from uploaded files.  
- Evaluate CV & Project Report using **OpenRouter LLM**.  
- Check evaluation results via job ID.  
- Global error handling.  
- Configurable via `.env`.  

## Project Structure
```
src/
 ├── config/
 │    └── env.js
 ├── controllers/
 │    ├── uploadController.js
 │    ├── evaluateController.js
 │    └── resultController.js
 ├── routes/
 │    ├── uploadRoutes.js
 │    ├── evaluateRoutes.js
 │    └── resultRoutes.js
 ├── services/
 │    └── evaluationService.js
 ├── utils/
 │    └── fileExtractor.js
 ├── app.js
 └── index.js
```

## Installation
1. Clone repository  
   ```bash
   git clone https://github.com/<username>/cv-evaluation.git
   cd cv-evaluation
   ```
2. Install dependencies  
   ```bash
   npm install
   ```
3. Create `.env` file  
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
   ```
4. Run server  
   ```bash
   node src/index.js
   ```
   Server will run at: `http://localhost:3000`

## API Endpoints

### 1. Upload CV + Project
**POST** `/upload`

Body: `form-data`
- `cv` → CV file (.pdf, .docx, .txt)  
- `project` → Project report file (.pdf, .docx, .txt)  

Response:
```json
{
  "id": "uuid-1234",
  "message": "Upload & extraction successful"
}
```

### 2. Trigger Evaluation
**POST** `/evaluate/:id`  
`:id` = uploadId from `/upload`

Response:
```json
{
  "jobId": "abcd-5678",
  "status": "processing"
}
```

### 3. Get Evaluation Result
**GET** `/result/:jobId`

Response:
```json
{
  "status": "completed",
  "result": {
    "cv_feedback": "Strong backend skills, limited AI exposure.",
    "project_feedback": "Good logic, but lacks error handling.",
    "overall_summary": "Solid candidate with potential."
  }
}
```

## Section 6: Screenshots
Include screenshots of **real LLM responses** from Postman:
1. `/upload` → response (upload CV & project)  
2. `/evaluate/:id` → response (jobId + processing status)  
3. `/result/:jobId` → response (final evaluation from OpenRouter)  

⚠️ Submissions without these screenshots will **not** be considered.

## Notes
- This project uses [OpenRouter](https://openrouter.ai) to access free open-source models.  
- Replace API key in `.env` before running.  
- If `.env` is accidentally committed, **revoke API key** immediately.  
