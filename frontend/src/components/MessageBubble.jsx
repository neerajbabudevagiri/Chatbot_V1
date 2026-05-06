function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`d-flex flex-row ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-4`}>
      {!isUser && (
        <div 
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2 shadow-sm"
          style={{ width: '40px', height: '40px', minWidth: '40px', fontSize: '14px', fontWeight: 'bold' }}
        >
          G
        </div>
      )}
      <div 
        className={`p-3 shadow-sm ${isUser ? 'bg-primary text-white' : 'bg-body-tertiary text-body'}`}
        style={{ 
          borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
          maxWidth: '75%', 
          wordBreak: 'break-word' 
        }}
      >
        <p className="small mb-0">{message.content}</p>
      </div>
      {isUser && (
        <div 
          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center ms-2 shadow-sm"
          style={{ width: '40px', height: '40px', minWidth: '40px', fontSize: '14px', fontWeight: 'bold' }}
        >
          U
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
