import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { askConcierge } from '../services/geminiService';

interface AIConciergeProps {
  context?: string;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Bienvenido a Casa de Alba. Soy su Concierge personal de IA. ¿Cómo puedo asistirle con esta propiedad o sus objetivos de inversión hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const answer = await askConcierge(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    setIsLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-accent transition-colors z-40 flex items-center gap-2 group"
        >
          <Sparkles size={20} className="group-hover:animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest pr-2">Concierge</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 animate-fadeIn">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <h3 className="font-serif italic text-lg tracking-tight">Casa de Alba AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-accent">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-xl rounded-bl-none shadow-sm text-xs text-gray-400 italic">
                   Consultando la bóveda...
                 </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunte por precio, ROI, amenidades..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary text-white p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIConcierge;