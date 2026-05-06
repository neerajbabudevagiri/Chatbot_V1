from fastapi import APIRouter
from services.state_manager import state_manager

router = APIRouter()

@router.post("/reset")
async def reset_state():
    state_manager.reset()
    return {"message": "Chat reset"}

@router.get("/state")
async def get_state():
    return {
        "messages": state_manager.get_messages(),
        "has_document": state_manager.has_document(),
        "document_name": state_manager.document_name,
        "has_image": state_manager.has_image(),
        "image_name": state_manager.image_name
    }
