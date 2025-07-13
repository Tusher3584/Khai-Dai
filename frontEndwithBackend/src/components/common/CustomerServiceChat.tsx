import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Phone, Mail, Clock } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  senderName?: string;
}

interface CustomerServiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! Welcome to Savora customer support. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
    senderName: 'Savora Bot'
  }
];

const quickReplies = [
  'Track my order',
  'Payment issue',
  'Restaurant not responding',
  'Delivery delay',
  'Refund request',
  'Account help'
];

export default function CustomerServiceChat({ isOpen, onClose }: CustomerServiceChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot/agent response
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that.",
        "Thank you for reaching out. I'm looking into this for you.",
        "I can definitely assist you with this issue.",
        "Let me connect you with a specialist for better assistance.",
        "I've noted your request and will process it immediately."
      ];

      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: isConnectedToAgent ? 'agent' : 'bot',
        timestamp: new Date(),
        senderName: isConnectedToAgent ? 'Sarah (Support Agent)' : 'Savora Bot'
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const connectToAgent = () => {
    setIsConnectedToAgent(true);
    const agentMessage: Message = {
      id: Date.now().toString(),
      text: "Hi! I'm Sarah, a customer support agent. I'm here to help you with your inquiry. What can I assist you with today?",
      sender: 'agent',
      timestamp: new Date(),
      senderName: 'Sarah (Support Agent)'
    };
    setMessages(prev => [...prev, agentMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="w-full max-w-md h-[600px] dark-card rounded-3xl shadow-large border border-gray-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="gradient-primary p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Customer Support</h3>
              <p className="text-xs text-white/80">
                {isConnectedToAgent ? 'Connected to Sarah' : 'Online • Typically replies instantly'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Support Options */}
        <div className="p-4 border-b border-gray-800 glass-dark">
          <div className="grid grid-cols-3 gap-3 text-center">
            <button
              onClick={connectToAgent}
              disabled={isConnectedToAgent}
              className="flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <div className="w-8 h-8 gradient-accent rounded-xl flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300 font-medium">Live Agent</span>
            </button>
            <a
              href="tel:+8801234567890"
              className="flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 gradient-secondary rounded-xl flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300 font-medium">Call Us</span>
            </a>
            <a
              href="mailto:support@savora.com"
              className="flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300 font-medium">Email</span>
            </a>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                {message.sender !== 'user' && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                      {message.sender === 'bot' ? (
                        <Bot className="h-3 w-3 text-white" />
                      ) : (
                        <User className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      {message.senderName}
                    </span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'gradient-primary text-white'
                      : 'glass-dark text-gray-200 border border-gray-700'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-dark border border-gray-700 rounded-2xl p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="px-3 py-2 text-xs glass-dark border border-gray-700 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 dark-input rounded-2xl text-sm"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>

        {/* Support Hours */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>Support available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}