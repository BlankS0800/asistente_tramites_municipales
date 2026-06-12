import { useState } from 'react';

interface Message {
  id?: string;
  sender: 'user' | 'bot';
  text: string;
}

export const useMunicipalChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (userQuery: string) => {
    if (!userQuery.trim() || loading) return;

    const userMessage: Message = { id: Math.random().toString(), sender: 'user', text: userQuery };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/workflows/run', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer app-ZwpyFd2kxaVEcfTaohmLc5uv', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            query: userQuery 
          },
          response_mode: 'blocking', 
          user: 'estudiante_umsa'
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta cruda de Dify Workflow:", data);

      const botResponseText = data.data?.outputs?.text || 
                              data.data?.outputs?.result || 
                              data.outputs?.text || 
                              "Flujo ejecutado con éxito, pero verifica el nombre de tu variable de salida.";

      const botMessage: Message = {
        id: data.task_id || Math.random().toString(),
        sender: 'bot',
        text: botResponseText
      };

      setMessages([...updatedMessages, botMessage]);

    } catch (error) {
      console.error("Error al conectar con el Workflow RAG:", error);
      
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: "Ocurrió un error al procesar el flujo del trámite. Por favor, intenta de nuevo."
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};