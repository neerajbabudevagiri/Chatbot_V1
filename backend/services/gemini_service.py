import os
import base64
import google.generativeai as genai
from services.state_manager import state_manager

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not set in environment variables")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
    
    def send_message(self, user_message):
        messages = []
        
        for msg in state_manager.get_messages():
            if msg["role"] == "user":
                messages.append({"role": "user", "parts": [msg["content"]]})
            else:
                messages.append({"role": "model", "parts": [msg["content"]]})
        
        current_prompt = user_message
        
        if state_manager.has_document():
            doc_text = state_manager.get_document()
            current_prompt = f"Document content:\n{doc_text}\n\nUser question: {user_message}"
        
        if state_manager.has_image():
            image_bytes = state_manager.get_image()
            
            image_data = {
                "mime_type": "image/jpeg",
                "data": base64.standard_b64encode(image_bytes).decode('utf-8')
            }
            
            response = self.model.generate_content([current_prompt, image_data])
        else:
            messages.append({"role": "user", "parts": [current_prompt]})
            response = self.model.generate_content(messages)
        
        return response.text

    def send_message_with_context(self, user_message, document_text=None, image_bytes=None):
        parts = [user_message]
        
        if document_text:
            document_context = f"\nDocument context:\n{document_text}"
            parts[0] = user_message + document_context
        
        if image_bytes:
            image_data = {
                "mime_type": "image/jpeg",
                "data": base64.standard_b64encode(image_bytes).decode('utf-8')
            }
            parts.append(image_data)
        
        response = self.model.generate_content(parts)
        return response.text
