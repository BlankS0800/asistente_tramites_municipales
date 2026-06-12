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

    // 1. Añadimos el mensaje del usuario a la pantalla
    const userMessage: Message = { id: Math.random().toString(), sender: 'user', text: userQuery };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // 2. Apuntamos al endpoint exacto de tu ejemplo cURL a través del proxy
      const response = await fetch('/api/workflows/run', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer app-ZwpyFd2kxaVEcfTaohmLc5uv', // Coloca tu API Key real aquí
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Colocamos la variable 'query' DENTRO de inputs tal como lo pide tu nodo INICIO
          inputs: {
            query: userQuery 
          },
          response_mode: 'blocking', // Cambiado a blocking para procesarlo fácil en una sola respuesta
          user: 'estudiante_umsa'
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta cruda de Dify Workflow:", data);

      // 3. Extraemos el texto generado por el flujo. 
      // En los Workflows de Dify, el resultado de la última caja suele venir en data.outputs.text o data.outputs.result
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