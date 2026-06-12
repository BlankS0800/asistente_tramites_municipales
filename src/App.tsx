import { MunicipalChat } from './MunicipalChat';
import { useMunicipalChat } from './useMunicipalChat';

function App() {
  const { messages, sendMessage, loading } = useMunicipalChat();

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-between font-sans antialiased">
      
      <header className="w-full bg-[#0b2545] py-3 px-4 text-center sm:text-left sm:px-8 shadow-md flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-white">
          <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">Proyecto de Inteligencia Artificial</span>
          <h1 className="text-sm font-semibold text-slate-200">UMSA - Facultad de Ciencias Puras y Naturales</h1>
        </div>
        <div className="text-xs bg-[#134074] border border-sky-900/50 text-sky-200 px-3 py-1 rounded-md font-mono">
          Carrera de Informática • 2026
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 space-y-6">
        
        <div className="text-center space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
             Gobierno Digital • Municipio de La Paz
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] tracking-tight">
            ASISTENTE DE TRÁMITES MUNICIPALES
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Un asistente conversacional inteligente para orientar a los ciudadanos en sus trámites municipales.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <MunicipalChat 
            onSendMessage={sendMessage} 
            messages={messages.length > 0 ? messages : undefined} 
            loading={loading} 
          />
        </div>

      </main>

      <footer className="w-full bg-slate-200 py-3 border-t border-slate-300 text-center text-[11px] text-slate-500 font-medium">
        Desarrollado por: <br/>● Hernan Yazid Perez Ovando <br/>
                          ● Boris Alvarado Monrroy 

      </footer>

    </div>
  );
}

export default App;