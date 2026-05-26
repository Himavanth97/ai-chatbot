"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, HeartPulse, X, MessageCircle } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am your Hospital Care Assistant. I can help you with hospital services, visiting hours, or finding the right department. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          history: messages.map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't process that.",
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again later.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)] bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:scale-110 transition-transform z-50 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 duration-300'}`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] h-[600px] z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="w-full h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          
          <header className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]">
                <HeartPulse size={16} className="text-white" />
              </div>
              <h2 className="font-semibold text-slate-100 text-sm">CareConnect Assistant</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-gradient-to-br from-teal-500 to-blue-600 text-white'}`}>
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${m.role === "user" ? "bg-slate-700 text-white rounded-tr-sm" : "bg-teal-900/30 border border-teal-500/20 text-slate-200 rounded-tl-sm"}`}>
                  {m.content.split('\\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 flex-row">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                  <Bot size={14} />
                </div>
                <div className="p-3 rounded-2xl bg-teal-900/30 border border-teal-500/20 text-slate-200 rounded-tl-sm">
                   <div className="flex gap-1 items-center h-4">
                     <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-700/50">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="absolute right-2 p-2 bg-teal-500 hover:bg-teal-400 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={!input.trim() || isLoading}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
