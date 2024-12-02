import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatHistoryState } from '../store/chatState';
import { getChatResponse } from '../api/chatApi';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useRecoilState(chatHistoryState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      message: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const botMessage = {
        type: 'bot',
        message: response.answer,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Health Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              chat.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {chat.type === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FaRobot className="text-blue-600" />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                chat.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{chat.message}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {chat.timestamp}
              </span>
            </div>
            {chat.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health question..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;