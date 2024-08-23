// src/lib/apiKey.js

export const getApiKey = () => {
  return localStorage.getItem("apiKeyChat"); // Implementa el código para obtener la API KEY desde Local Storage
  //console.log(localStorage.getItem("ApiKeyChat"));
};
 
export const setApiKey = (key) => {
  localStorage.setItem("apiKeyChat",key);// Implementa el código para guardar la API KEY en Local Storage
  //console.log(localStorage.getItem("apiKeyChat"));// toda la info salió de aquí https://developer.mozilla.org/en-US/docs/Web/API/Storage/s
};