from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import GeminiService
from services.state_manager import state_manager

router = APIRouter()

class Message(BaseModel):
    text: str

@router.post("/chat")
async def chat(message: Message):
    try:
        gemini_service = GeminiService()
        response = gemini_service.send_message(message.text)
        
        state_manager.add_message("user", message.text)
        state_manager.add_message("assistant", response)
        
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/history")
async def get_history():
    return {"messages": state_manager.get_messages()}
