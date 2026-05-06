from fastapi import APIRouter, UploadFile, File, HTTPException
from services.state_manager import state_manager
from services.file_processor import FileProcessor

router = APIRouter()

@router.post("/upload/document")
async def upload_document(file: UploadFile = File(...)):
    try:
        if file.content_type == "application/pdf":
            text = FileProcessor.extract_pdf(await file.read())
        elif file.content_type == "text/plain":
            text = (await file.read()).decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        state_manager.set_document(text, file.filename)
        return {"message": "Document uploaded", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload/image")
async def upload_image(file: UploadFile = File(...)):
    try:
        if file.content_type not in ["image/png", "image/jpeg", "image/jpg"]:
            raise HTTPException(status_code=400, detail="Unsupported image type")
        
        image_bytes = await file.read()
        state_manager.set_image(image_bytes, file.filename)
        return {"message": "Image uploaded", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/upload/status")
async def get_upload_status():
    return {
        "has_document": state_manager.has_document(),
        "document_name": state_manager.document_name,
        "has_image": state_manager.has_image(),
        "image_name": state_manager.image_name
    }
