import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [theme, setTheme] = useState('light');

  const API_BASE = 'http://localhost:8000';

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const loadState = async () => {
    try {
      const response = await axios.get(`${API_BASE}/state`);
      setMessages(response.data.messages);
      if (response.data.has_document) {
        setUploadedDocument(response.data.document_name);
      }
      if (response.data.has_image) {
        setUploadedImage(response.data.image_name);
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/chat`, { text });
      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/upload/document`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedDocument(response.data.filename);
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/upload/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedImage(response.data.filename);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE}/reset`);
      setMessages([]);
      setUploadedDocument(null);
      setUploadedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-6">
          <div className="card shadow-lg" id="chat2" style={{ borderRadius: '15px', height: '85vh' }}>
            <div className="card-header d-flex justify-content-between align-items-center p-3 bg-body-secondary border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                <h5 className="mb-0 fw-bold">Gemini AI Assistant</h5>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm fw-bold px-3" onClick={toggleTheme}>
                  {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
                <button className="btn btn-outline-secondary btn-sm fw-bold px-3" onClick={handleReset}>Reset Session</button>
              </div>
            </div>

            <div className="card-body overflow-auto p-4 bg-body" style={{ position: 'relative' }}>
              <ChatWindow messages={messages} loading={loading} />
            </div>

            <div className="card-footer text-muted d-flex flex-column justify-content-start align-items-stretch p-3 bg-body-secondary border-top-0" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
              {(uploadedDocument || uploadedImage) && (
                <div className="d-flex gap-2 mb-3">
                  {uploadedDocument && (
                    <span className="badge rounded-pill bg-primary px-3 py-2">Doc: {uploadedDocument}</span>
                  )}
                  {uploadedImage && (
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge rounded-pill bg-info text-dark px-3 py-2">Img: {uploadedImage}</span>
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="rounded shadow-sm" style={{ height: '40px' }} />
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <ChatInput 
                onSendMessage={handleSendMessage}
                onDocumentUpload={handleDocumentUpload}
                onImageUpload={handleImageUpload}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
