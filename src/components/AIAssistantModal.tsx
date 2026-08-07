import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bot, Send, X, Sparkles, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const AIAssistantModal: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text:
        language === 'bn'
          ? 'নমস্কার/আসসালামু আলাইকুম! আমি কৃষিবাজার এআই সহায়ক। আপনার ফসল, রোগ বা বালাইনাশক সংক্রান্ত যে কোনো প্রশ্ন করতে পারেন।'
          : 'Hello! I am KrishiBazar AI Assistant. Ask me anything about crop diseases, fertilizers, or seasonal care.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, language }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          language === 'bn'
            ? 'দুঃখিত, সংযোগ সমস্যার কারণে উত্তর দিতে বিলম্ব হচ্ছে। দয়া করে আবার চেষ্টা করুন।'
            : 'Sorry, could not process request right now. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = language === 'bn'
    ? [
        'ধানের ব্লাস্ট রোগের লক্ষণ কি?',
        'ইউরিয়া সার কখন দেওয়া উচিত?',
        'আলুর নাবি ধসা রোগ রোধের উপায়?',
      ]
    : [
        'Symptoms of Rice Blast disease?',
        'When to apply Urea fertilizer?',
        'How to prevent Potato Late Blight?',
      ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all ring-4 ring-green-200"
        title={t('aiAssistant')}
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-white" />
          <Sparkles className="w-3 h-3 text-[#F9A825] absolute -top-1 -right-1 animate-pulse" />
        </div>
        <span className="text-xs font-bold hidden sm:inline pr-1">
          {t('aiAssistant')}
        </span>
      </button>

      {/* Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="bg-[#2E7D32] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                  <Bot className="w-6 h-6 text-[#F9A825]" />
                </div>
                <div>
                  <h3 className="font-bold text-base flex items-center gap-1.5">
                    {t('aiAssistant')}
                    <span className="bg-[#F9A825] text-gray-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                      এআই
                    </span>
                  </h3>
                  <p className="text-xs text-green-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-ping"></span>
                    {language === 'bn' ? 'অনলাইন সাপোর্ট' : 'Online Support'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="bg-green-50/70 p-2.5 border-b border-green-100 flex gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap bg-white text-[#2E7D32] border border-green-200 text-xs px-3 py-1.5 rounded-full hover:bg-green-100 active:scale-95 transition-all shadow-xs font-medium"
                >
                  💡 {q}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAF8]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-green-100 text-[#2E7D32]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#2E7D32] text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[10px] block mt-1 text-right ${
                        msg.sender === 'user' ? 'text-green-200' : 'text-gray-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-2xl border border-gray-100 w-fit">
                  <Loader2 className="w-4 h-4 animate-spin text-[#2E7D32]" />
                  <span>{language === 'bn' ? 'উত্তর তৈরি করা হচ্ছে...' : 'Generating response...'}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('askAI')}
                className="flex-1 bg-gray-100 border border-gray-200 text-gray-900 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#2E7D32] text-white flex items-center justify-center disabled:opacity-50 hover:bg-green-800 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
