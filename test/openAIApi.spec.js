import { communicateWithOpenAI } from '../src/lib/openAIApi.js'; // Asegúrate de que la ruta sea correcta
import { getApiKey } from '../src/lib/apiKey.js';

// Mockear el módulo apiKey
jest.mock('../src/lib/apiKey.js', () => ({
  getApiKey: jest.fn(),
}));

// Mockear la función global fetch
// eslint-disable-next-line no-undef
global.fetch = jest.fn();// eslint-disable-next-line no-undef

describe('communicateWithOpenAI', () => {
  const selectedItem = {
    name: 'Personaje de prueba',
    description: 'es una simulación ',
    personality: 'simulación',
  };
  const userMessage = 'Hello!';

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  it('Devuelve datos de la API', async () => {
    // Datos simulados para la respuesta de fetch
    const mockResponse = {
      choices: [{ message: { content: 'Hola!' } }],
    };
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Mockear la función getApiKey
    getApiKey.mockReturnValue('mock-api-key');

    const data = await communicateWithOpenAI(selectedItem, userMessage);

    expect(fetch).toHaveBeenCalledWith("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer mock-api-key`,
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
    });

    expect(data).toEqual(mockResponse);
  });

  it('Lanza un error cuando la respuesta de fetch no es correcta', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    getApiKey.mockReturnValue('mock-api-key');

    try {
      await communicateWithOpenAI(selectedItem, userMessage);
    } catch (error) {
      expect(error).toEqual(new Error('La respuesta no fue correcta'));
    }
  });

  it('Lanza un error cuando fetch falla', async () => {
    const mockError = new Error('Network Error');
    fetch.mockRejectedValue(mockError);

    getApiKey.mockReturnValue('mock-api-key');

    try {
      await communicateWithOpenAI(selectedItem, userMessage);
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });
});