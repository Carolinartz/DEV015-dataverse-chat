import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
//import dataset from "../data/dataset.js";
import { navigateTo } from "../router.js";
//import { communicateWithOpenAI } from '../lib/openAIApi.js';

//Código optimizado
export const chatGrupal = () => { 
  const viewEl = document.createElement('section');
  viewEl.classList.add("view");
  
  //Añadir Header
  viewEl.appendChild(Header());
  
  //Crear la sección principal de la página
  const mainEl = document.createElement('main');
  mainEl.classList.add("main-content");
  
  //Crear la sección del chat grupal
  const viewChatGroup = document.createElement('section');
  viewChatGroup.classList.add('viewChatGroup');
  viewChatGroup.innerHTML = `
    <button id="goBack" class="btn-go-back">Home</button>
    <div class="chat-container">
      <div class="navbar-chatGroup">
        <div class="series"></div>
      </div>
      <div class="form-chatGroup">
        <div class="text-message">
          <input id="input-chatGroup" type="text" placeholder="Escribe aquí para iniciar tu chat">
          <button class="btn-send" id="btn-ChatGroup">Send</button>
        </div>
      </div>
    </div>
  `;
  
  //Añadir secciones al elemento principal
  mainEl.appendChild(viewChatGroup);
  viewEl.appendChild(mainEl);
 
  //Añadir Footer
  viewEl.appendChild(Footer());

  // Añadir evento para botón "Home"
  const btnBackHome = viewEl.querySelector('#goBack');
  btnBackHome.addEventListener("click", () => {
    navigateTo("/");
  });

  //Botón para enviar mensajes dentro del chat
  const btnSend = viewEl.querySelector('#btn-ChatGroup');
  const inputChatGroup = viewEl.querySelector('#input-chatGroup');
 
  btnSend.addEventListener("click", () => {
    const message = inputChatGroup.value.trim();
    if (message) {
      // Limpiar el input después de enviar el mensaje
      inputChatGroup.value = '';
    }
  });

  return viewEl;
};