import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id?: string;
  sender: 'user' | 'bot';
  text: string;
}

interface MunicipalChatProps {
  onSendMessage: (message: string) => void;
  messages?: Message[];
  loading?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  sender: 'bot',
  text: 'Bienvenido a **SATIC (Plataforma Inteligencia de Trámites Ciudadanos)**.\n\nEste canal inteligente tiene la función de guiarlo de manera inmediata sobre requisitos, procedimientos oficiales, costos y flujos legales del municipio, utilizando los manuales vigentes del **Gobierno Autónomo Municipal de La Paz**.\n\n¿Qué trámite o licencia desea consultar hoy?'
};

export const MunicipalChat: React.FC<MunicipalChatProps> = ({ 
  onSendMessage, 
  messages = [INITIAL_MESSAGE], 
  loading = false 
}) => {
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[550px] md:h-[600px] w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
      
      <div className="flex items-center justify-between px-4 py-3.5 bg-[#0b2545] border-b border-slate-700 shadow-sm">
        <div className="flex items-center gap-3 text-left">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base tracking-wide">ChatBot Orientación Ciudadana AI</h2>
            <p className="text-[11px] text-slate-300 font-light">Ventanilla Única de Consulta Automatizada</p>
          </div>
        </div>
        <span className="text-[10px] bg-[#134074] text-sky-100 px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
          En Línea
        </span>
      </div>

      {/* Cuerpo del Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-left">
        {messages.map((msg) => (
          <div
            key={msg.id || Math.random().toString()}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#134074] text-white rounded-br-none font-medium whitespace-pre-wrap'
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-200/80'
              }`}
            >
              {msg.sender === 'bot' ? (
                <div className="prose prose-sm max-w-none text-slate-800 space-y-1 
                                [&_strong]:font-bold [&_strong]:text-[#0b2545] 
                                [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {/* Indicador de carga */}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
              <span className="text-xs text-slate-400">Validando requisitos en base centralizado...</span>
              <div className="flex gap-1 items-center pt-0.5">
                <div className="w-1.5 h-1.5 bg-[#134074] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-[#134074] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-[#134074] rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Barra de entrada de texto */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escriba aquí su consulta (Ej: Requisitos de Patente, Liquidación de Inmuebles...)"
          disabled={loading}
          className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#134074] focus:ring-1 focus:ring-[#134074] transition-all disabled:opacity-60 text-left"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#134074] hover:bg-[#0b2545] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Consultar
        </button>
      </form>
    </div>
  );
};