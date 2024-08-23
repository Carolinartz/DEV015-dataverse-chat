import { getApiKey, setApiKey } from "../src/lib/apiKey.js";
describe("getApiKey", () => {
  it("Devuelve el valor de la API Key", () => {
    const apiKeyValue = "minhaAPIKey";
    localStorage.setItem("apiKeyChat", apiKeyValue);

    expect(getApiKey()).toEqual(apiKeyValue);
  });
});

describe("setApiKey", () => {
  it("Establece correctamente la API Key", () => {
    const apiKeyValue = "novaAPIKey";
    setApiKey(apiKeyValue);

    expect(localStorage.getItem("apiKeyChat")).toEqual(apiKeyValue);
  });
});