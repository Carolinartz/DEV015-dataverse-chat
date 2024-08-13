import { getApiKey, setApiKey } from "../lib/apiKey.js";

export const modal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const viewApi = document.createElement('section');
  viewApi.classList.add('modal-container');
  viewApi.id = 'modal-section';

  viewApi.innerHTML = `
    <div id="API" >
    <button id="close-button" value="close" class="close-modal">X</button>
    <h1 itemprop="title modal" id="title-name">Agrega la API key compartida</h1>
    <h2 itemprop="title2 modal">¡Comienza a chatear con tus series favoritas!</h2>
    <input type="text" name="input-key" value="" id="modal-input" class="input-modal"/>
    <button id="modal-button" value="save" class="button-modal">Guardar API key</button>
    </div>
  `;

  const closeButton = viewApi.querySelector('#close-button');
  const saveButton = viewApi.querySelector('#modal-button');
  const apiKeyInput = viewApi.querySelector('#modal-input');

  // Inicializar el valor del campo de entrada con la clave API existente
  apiKeyInput.value = getApiKey() || '';

  //función para crear modal para mensajes
  function createModal(message, type = 'error') {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container', type); //añadir clase para estilizar basado en type (error, success)

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `
      <p>${message}</p>
      <button class="close-modal">X</button>
    `;

    modalContainer.appendChild(modalContent);
    overlay.appendChild(modalContainer);

    //añadir event listener para cerrar botón
    const closeModalButton = modalContainer.querySelector('.close-modal');
    closeModalButton.addEventListener('click', () => {
      modalContainer.remove();
    });

    return modalContainer;
  }

  function closeModal() {
    overlay.style.display = 'none';
  }

  function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      createModal('Por favor, ingresa una clave API.');
    } else {
      //intentar obtener la API key y manejar posibles errores
      try {
        setApiKey(apiKey);
        const successModal = createModal('<h1 itemprop="title modal">¡Felicitaciones!<h1><h2 itemprop="title2 modal">Ahora puedes disfrutar de nuestros chats.<h2>', 'success');
        setTimeout(() => {
          successModal.remove(); //Eliminar modal de éxito
          closeModal(); //Cerrar modal de api
        }, 5000);
      } catch (error) {
        createModal('API key no válida.<br>Por favor, verifica la clave e inténtalo nuevamente.'); //esto por revisar
      }
    }
  }

  closeButton.addEventListener('click', closeModal);
  saveButton.addEventListener('click', saveApiKey);

  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  overlay.appendChild(viewApi);
  document.body.appendChild(overlay);
  return { overlay, viewApi };
};
