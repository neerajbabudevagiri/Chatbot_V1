class StateManager:
    def __init__(self):
        self.messages = []
        self.document_text = None
        self.document_name = None
        self.image_bytes = None
        self.image_name = None
    
    def add_message(self, role, content):
        self.messages.append({"role": role, "content": content})
    
    def get_messages(self):
        return self.messages
    
    def set_document(self, text, filename):
        self.document_text = text
        self.document_name = filename
    
    def get_document(self):
        return self.document_text
    
    def has_document(self):
        return self.document_text is not None
    
    def set_image(self, image_bytes, filename):
        self.image_bytes = image_bytes
        self.image_name = filename
    
    def get_image(self):
        return self.image_bytes
    
    def has_image(self):
        return self.image_bytes is not None
    
    def reset(self):
        self.messages = []
        self.document_text = None
        self.document_name = None
        self.image_bytes = None
        self.image_name = None

state_manager = StateManager()
