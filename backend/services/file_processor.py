import io
import PyPDF2

class FileProcessor:
    @staticmethod
    def extract_pdf(file_bytes):
        pdf_file = io.BytesIO(file_bytes)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    @staticmethod
    def extract_text(file_bytes):
        return file_bytes.decode("utf-8")
