# Gemini Chatbot - Execution Guide

Follow these steps to get your chatbot up and running.

## 1. Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **Google Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/app/apikey))

---

## 2. Backend Setup
1. Open a terminal in the `backend` folder.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the environment:
   - **Windows**: `.\venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. **Configure API Key**:
   - Create a file named `.env` in the `backend` folder.
   - Add this line: `GEMINI_API_KEY=your_key_here`
6. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

---

## 3. Frontend Setup
1. Open a **new** terminal in the `frontend` folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```

---

## 4. How to Use & Test
1. Open your browser to **http://localhost:5173**.
2. **Text Chat**: Type a message and hit Enter or click the Arrow button.
3. **Upload Files**:
   - Click **Doc** to upload a PDF or TXT file.
   - Click **Img** to upload an image.
   - Ask questions about your uploads.
4. **Theme**: Toggle between **Light** and **Dark** modes using the button in the header.
5. **Reset**: Click **Reset Session** to clear all chat history and files.

---

## 5. Troubleshooting
- **Backend Error?** Check if your `.env` file has the correct API key.
- **Frontend Error?** Ensure the backend is running on port 8000.
- **Port Busy?** If a port is in use, close the terminal and try again.
