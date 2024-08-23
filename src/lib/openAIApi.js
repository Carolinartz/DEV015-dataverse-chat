import { getApiKey } from './apiKey.js';


//const OPENAI_API_KEY = getApiKey();

export const communicateWithOpenAI = (selectedItem,userMessage) => {
  const OPENAI_API_KEY = getApiKey();
  const url = "https://api.openai.com/v1/chat/completions";

  // HACIENDO LA SOLICITUD
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Ahora estas chateando con ${selectedItem.name}, Un personaje conocido por ser ${selectedItem.description}. Ellos responden en una ${selectedItem.personality} manner. Usuario dice: "${userMessage}"`,
        },
        {
          role: "user",
          content: `${userMessage}`,
        }
      ]
    })
  })
  
    .then((response) => {
      
      if (!response.ok) {
        throw new Error('La respuesta no fue correcta');
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error al hacer la solicitud:", error);// eslint-disable-next-line no-undef

      return error
    });
};
