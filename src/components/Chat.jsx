import { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Replace 'backend-chat-app-ey4p.onrender.com' with your actual backend hostname
    const wsUrl = "wss://backend-chat-app-ey4p.onrender.com/";
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages
    ws.current.send(input);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="btn-send btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
