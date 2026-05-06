# Gemini Chatbot Web App

A minimal full-stack chatbot web application powered by Google Gemini API. Upload documents and images, ask questions, and get intelligent responses.

## Features

- **Text Chat**: Real-time conversation with Gemini AI
- **Document Support**: Upload and analyze PDF and TXT files
- **Image Analysis**: Upload and analyze PNG and JPG images
- **Conversation Context**: Maintains chat history during the session
- **Responsive Design**: Works on desktop and mobile devices
- **Reset Chat**: Clear conversation history and uploaded files anytime

## Tech Stack

### Frontend
- React 18 with Vite
- Axios for HTTP requests
- Plain CSS with modern styling
- Responsive design

### Backend
- Python FastAPI
- Uvicorn WSGI server
- PyPDF2 for PDF extraction
- Google Generative AI SDK

### AI Model
- Google Gemini 1.5 Flash (lightweight and fast)

## Project Structure

```
Chatbot_V1/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── routes/
│   │   ├── chat.py            # Chat route handlers
│   │   ├── upload.py          # File upload route handlers
│   │   └── state.py           # State management routes
│   ├── services/
│   │   ├── gemini_service.py  # Gemini API integration
│   │   ├── state_manager.py   # In-memory state management
│   │   └── file_processor.py  # Document processing
│   ├── requirements.txt
│   ├── .env.example
│   └── .env                    # (Create this with your API key)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   └── MessageBubble.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env (optional, for API base URL)
├── README.md
└── .gitignore
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Google Gemini API Key

### Step 1: Get Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key in new project"
3. Copy your API key

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

6. Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### Step 3: Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

Backend will be available at: `http://localhost:8000`

### Start the Frontend

From the `frontend` directory:

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Usage

### Text Chat
1. Type a message in the input field
2. Press Enter or click Send
3. Wait for the Gemini response
4. Continue the conversation

### Upload Document
1. Click "Document" button
2. Select a PDF or TXT file
3. Ask questions about the document
4. The AI will reference the document content

Example:
- Upload a PDF about Python
- Ask: "What are the best practices?"

### Upload Image
1. Click "Image" button
2. Select a PNG or JPG image
3. Ask questions about the image
4. The AI will analyze the image

Example:
- Upload a screenshot
- Ask: "What is shown in this screenshot?"

### New Chat
1. Click "New Chat" button
2. All messages, documents, and images are cleared
3. Start a fresh conversation

## API Routes

### Chat Routes

**POST /chat**
- Send a message and get a response
- Body: `{ "text": "Your message" }`
- Response: `{ "response": "AI response" }`

**GET /chat/history**
- Get current chat history
- Response: `{ "messages": [...] }`

### Upload Routes

**POST /upload/document**
- Upload a PDF or TXT file
- Content-Type: multipart/form-data
- Success: `{ "message": "Document uploaded", "filename": "..." }`

**POST /upload/image**
- Upload a PNG or JPG image
- Content-Type: multipart/form-data
- Success: `{ "message": "Image uploaded", "filename": "..." }`

**GET /upload/status**
- Check upload status
- Response: `{ "has_document": bool, "document_name": "...", "has_image": bool, "image_name": "..." }`

### State Routes

**POST /reset**
- Clear all chat state, documents, and images
- Response: `{ "message": "Chat reset" }`

**GET /state**
- Get complete current state
- Response: `{ "messages": [...], "has_document": bool, "document_name": "...", "has_image": bool, "image_name": "..." }`

**GET /**
- Health check
- Response: `{ "status": "ok" }`

## Context Handling

The application maintains conversation context in the following ways:

### In-Memory Storage
- All data stored in `StateManager` class
- Data persists only during the current session
- Data is cleared when server restarts

### Message History
- User and assistant messages stored in a list
- Passed to Gemini with each new message
- Allows Gemini to understand conversation context

### Document Context
- Extracted text stored in memory
- Prepended to user message before sending to Gemini
- Gemini can reference document content in responses

### Image Context
- Image bytes encoded to base64
- Sent directly with message to Gemini Vision
- Only one image at a time (new image replaces old)

## Example API Response Flow

### Text Chat Example:

Request:
```json
{"text": "What is machine learning?"}
```

Response:
```json
{
  "response": "Machine learning is a subset of artificial intelligence..."
}
```

### Document Q&A Example:

1. User uploads PDF about Python
2. Backend extracts text and stores it
3. User asks: "What is a decorator?"
4. Backend adds document context to prompt:
   ```
   Document content:
   [Full PDF text here]
   
   User question: What is a decorator?
   ```
5. Gemini responds with answer from document context

### Image Analysis Example:

Request body with image file:
```
Form Data:
- file: image.jpg
```

User then asks: "What's in this image?"

Backend sends:
- Message text
- Image as base64
- Gemini analyzes and responds

## Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### Frontend (optional .env)
```
VITE_API_BASE=http://localhost:8000
```

## Troubleshooting

### Backend Connection Error
- Ensure backend is running on port 8000
- Check CORS is enabled in FastAPI
- Verify frontend is making requests to `http://localhost:8000`

### Gemini API Error
- Verify API key is correct
- Check API key has Generative AI access
- Ensure API key is not expired

### File Upload Issues
- For PDF: Ensure file is valid PDF format
- For TXT: File should be plain text encoding
- For Images: Use PNG or JPG format
- File size should be reasonable (< 20MB)

### Chat Not Responding
- Check network tab in browser dev tools
- Verify backend is receiving requests
- Check backend logs for errors
- Ensure Gemini API is responding

## Performance Notes

- Gemini 1.5 Flash is optimized for speed
- Context size can handle typical conversations
- Document size limit depends on Gemini's token limit
- Image analysis is fast and efficient

## Limitations

- No persistent database (restarts clear data)
- No user authentication
- Single user per session
- One active image/document at a time
- No chat export functionality

## Future Enhancements

- Add database for persistent storage
- Add user authentication
- Support more file formats
- Add chat history export
- Add voice input/output
- Add conversation sharing

## License

MIT

## Getting Help

1. Check the troubleshooting section
2. Verify all environment variables are set
3. Check backend and frontend logs
4. Ensure all dependencies are installed correctly
