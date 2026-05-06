import { useState, useRef } from 'react';

function ChatInput({ onSendMessage, onDocumentUpload, onImageUpload, disabled }) {
  const [input, setInput] = useState('');
  const documentFile = useRef(null);
  const imageFile = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onDocumentUpload(file);
      if (documentFile.current) documentFile.current.value = '';
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      if (imageFile.current) imageFile.current.value = '';
    }
  };

  return (
    <div className="chat-input-wrapper w-100">
      <div className="input-group align-items-center">
        <button 
          className="btn btn-link text-decoration-none text-muted p-2"
          onClick={() => documentFile.current?.click()}
          disabled={disabled}
          title="Attach Document"
        >
          Doc
        </button>
        <button 
          className="btn btn-link text-decoration-none text-muted p-2 me-2"
          onClick={() => imageFile.current?.click()}
          disabled={disabled}
          title="Attach Image"
        >
          Img
        </button>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          disabled={disabled}
          className="form-control border-0 bg-body-tertiary rounded-pill px-4 text-body"
          style={{ height: '45px' }}
        />
        
        <button 
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="btn btn-primary rounded-circle ms-2 d-flex align-items-center justify-content-center"
          style={{ width: '45px', height: '45px', minWidth: '45px' }}
        >
          <div className="send-arrow"></div>
        </button>

        <input type="file" ref={documentFile} onChange={handleDocumentChange} accept=".pdf,.txt" style={{ display: 'none' }} />
        <input type="file" ref={imageFile} onChange={handleImageChange} accept="image/png,image/jpeg" style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default ChatInput;
