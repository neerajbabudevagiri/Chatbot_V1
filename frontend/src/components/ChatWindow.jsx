import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

function ChatWindow({ messages, loading }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window d-flex flex-column gap-3" ref={scrollRef}>
      {messages.length === 0 ? (
        <div className="text-center my-auto px-4">
          <h2 className="text-primary fw-bold">Welcome to Gemini Chatbot</h2>
          <p className="text-muted">Upload documents and images, then ask questions about them to get started.</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))
      )}
      {loading && (
        <div className="d-flex align-items-center gap-2 text-primary p-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="small">Gemini is thinking...</span>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
