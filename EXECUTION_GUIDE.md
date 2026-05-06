# Execution Guide - Gemini Chatbot Web App

## Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Google Gemini API Key (from https://aistudio.google.com/app/apikey)

## Status: Starting Installation

Currently installing backend dependencies...

---

## COMPLETE EXECUTION STEPS

### 1. BACKEND SETUP & EXECUTION

#### Step 1a: Create & Activate Virtual Environment
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
# source venv/bin/activate     # macOS/Linux
```

#### Step 1b: Install Dependencies
```bash
pip install -r requirements.txt
```

 Backend dependencies: FastAPI, Uvicorn, PyPDF2 (3.0.1), Google Generative AI SDK

#### Step 1c: Configure API Key
Edit `backend/.env`:
```
GEMINI_API_KEY=your_actual_google_gemini_api_key
```

#### Step 1d: Run Backend Server
```bash
uvicorn main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

 Backend running at: http://localhost:8000

---

### 2. FRONTEND SETUP & EXECUTION

Open a NEW terminal window:

#### Step 2a: Install Node Dependencies
```bash
cd frontend
npm install
```

This installs:
- React 18
- Axios
- Vite
- React plugins

#### Step 2b: Run Frontend Development Server
```bash
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

 Frontend running at: http://localhost:5173

---

### 3. OPEN APPLICATION IN BROWSER

1. Open your browser
2. Navigate to: http://localhost:5173
3. You should see the Gemini Chatbot interface

---

## QUICK TROUBLESHOOTING

### Backend Won't Start
```bash
Check Python: python --version
Check dependencies: pip list | findstr fastapi
Reinstall: pip install --upgrade -r requirements.txt
Check .env: Verify GEMINI_API_KEY is set
```

### Frontend Won't Start
```bash
Check Node: node --version
Check npm: npm --version
Clear cache: npm cache clean --force
Reinstall: rm -r node_modules && npm install
```

### No Backend Connection
- Backend running on 8000? Check with: curl http://localhost:8000
- CORS enabled? Check FastAPI main.py has CORSMiddleware
- API key invalid? Test with: GEMINI_API_KEY=test_key python -c "from google import genai"

### Chat Not Responding
1. Check APIkey is valid at https://aistudio.google.com/app/apikey
2. Open browser DevTools (F12) → Network tab
3. Check if requests are reaching backend
4. Check backend console for error messages

---

## TEST THE APPLICATION

### Test 1: Simple Text Chat
1. Type: "Hello, what is your name?"
2. Click Send or press Enter
3. Should receive Gemini response

### Test 2: Document Upload
1. Create a simple text file: `test.txt`
   ```
   Python is a programming language.
   It was created by Guido van Rossum.
   ```
2. Click " Document" button
3. Upload test.txt
4. Ask: "What is Python?"
5. Bot should reference document

### Test 3: Image Upload
1. Prepare any JPG or PNG image
2. Click " Image" button
3. Upload image
4. Ask: "What is in this image?"
5. Bot should analyze image

### Test 4: New Chat Reset
1. Click "New Chat" button
2. Chat history should be cleared
3. Uploaded files should be removed
4. Fresh conversation state ready

---

## PRODUCTION DEPLOYMENT

To deploy to production server:

### Backend
```bash
pip install -r requirements.txt
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm run build
# Serve dist/ folder with nginx or similar
```

---

## DEVELOPMENT WORKFLOW

### Make Changes to Backend
1. Edit files in `backend/` directory
2. Server auto-reloads (uvicorn --reload)
3. Changes take effect immediately

### Make Changes to Frontend
1. Edit files in `frontend/src/` directory
2. Browser hot-reloads (Vite dev server)
3. Changes visible immediately

### Add New API Routes
1. Create new file in `backend/routes/`
2. Define router functions
3. Include router in `main.py`
4. Access via http://localhost:8000/route

### Customize Frontend UI
1. Edit `frontend/src/App.css` for styling
2. Edit components in `frontend/src/components/` for functionality
3. Changes visible in real-time with Vite

---

## PROJECT OVERVIEW

### Backend Architecture
```
main.py
├── routes/
│   ├── chat.py          (POST /chat)
│   ├── upload.py        (POST /upload/*)
│   └── state.py         (POST /reset, GET /state)
├── services/
│   ├── gemini_service.py    (AI API calls)
│   ├── state_manager.py     (In-memory state)
│   └── file_processor.py    (File extraction)
└── requirements.txt
```

### Frontend Architecture
```
App.jsx (Main component)
├── ChatWindow.jsx (Message display)
│   └── MessageBubble.jsx (Individual message)
├── ChatInput.jsx (Input + upload buttons)
└── App.css (Styling)
```

---

## USEFUL COMMANDS REFERENCE

### Backend Terminal
```bash
# Activate venv
.\venv\Scripts\activate

# Run server
uvicorn main:app --reload

# Exit server
Ctrl+C

# Install new package
pip install package_name

# Check installed packages
pip list
```

### Frontend Terminal
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Exit server
Ctrl+C

# Clear npm cache
npm cache clean --force
```

---

## SYSTEM REQUIREMENTS VERIFICATION

Run these commands to verify setup:

```bash
# Python check
python --version
# Expected: Python 3.8+ (Currently: 3.12.2)

# Node check
node --version
# Expected: 14+

# npm check
npm --version
# Expected: 6+

# Common Python packages check
pip list | findstr fastapi
pip list | findstr google-generativeai
pip list | findstr PyPDF2
```

---

## NEXT STEPS

1. Get Gemini API Key
2. Setup Backend (currently in progress)
3. Setup Frontend
4. Add API Key to .env
5. Start both servers
6. Open http://localhost:5173
7. Test chat, uploads, reset
8. Customize as needed
9. Deploy to production

---

## SUPPORT & DEBUGGING

### Check Logs
Backend: Console where `uvicorn main:app` is running
Frontend: Browser Console (F12 → Console tab)

### Common Issues Database
1. **Timeout on pip install**: Large dependency tree, may take 5-10 min
2. **PyPDF2 version error**: Use 3.0.1 not 4.0.1 (fixed in requirements.txt)
3. **Google API errors**: Verify API key is correct and activated
4. **CORS errors**: Check FastAPI CORSMiddleware is configured
5. **Port already in use**: Change port in vite.config.js or uvicorn command

### Real-time Debugging
- Backend: Check console output in terminal
- Frontend: Open DevTools (F12) to see network requests
- API: Test directly with curl:
  ```bash
  curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d "{\"text\":\"Hello\"}"
  ```

---

## Final Verification Checklist

Before considering setup complete:

- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] Virtual environment created
- [ ] Backend dependencies installed
- [ ] .env file created with GEMINI_API_KEY
- [ ] Backend server running on http://localhost:8000
- [ ] Frontend dependencies installed
- [ ] Frontend server running on http://localhost:5173
- [ ] Browser shows Gemini Chatbot UI
- [ ] Chat responds to messages
- [ ] Can upload documents
- [ ] Can upload images
- [ ] New Chat button clears state

Once all checked , your Gemini Chatbot is fully operational!

---

Generated: May 6, 2026
Project: Gemini Chatbot Web App
