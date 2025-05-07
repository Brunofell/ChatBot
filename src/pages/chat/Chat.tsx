import './Chat.css';
import Header from "../../components/header/Header";
import { useState } from 'react';

export default function Chat(){
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{role: 'bot', content: 'Hello there! 🎶 Ask me anything about music '},]);

    const handleSend = async () => {
        if (input.trim() === '') return;
      
        const newUserMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage]);
        const question = input;
        setInput('');
      
        try {
          const response = await fetch(`http://localhost:8080/chat/music?message=${encodeURIComponent(question)}`, {
            method: 'GET',
          });
      
          if (!response.body) {
            throw new Error('Resposta sem corpo');
          }
      
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let botResponse = '';
          
          // Cria um balão inicial do bot vazio
          setMessages(prev => [...prev, { role: 'bot', content: '' }]);
      
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
      
            botResponse += decoder.decode(value, { stream: true });
      
            // Atualiza apenas o último balão do bot
            setMessages(prev => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
      
              if (updated[lastIndex].role === 'bot') {
                updated[lastIndex] = { role: 'bot', content: botResponse };
              }
      
              return updated;
            });
          }
      
        } catch (error) {
          console.error(error);
          setMessages(prev => [...prev, { role: 'bot', content: "Oops! Couldn't fetch the response 😢"}]);
        }
      };
      

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSend();
        }
      };

    return (
        <div className="chat-container">
        <Header />
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type your question about music... 🎵"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              />
              <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    )
}