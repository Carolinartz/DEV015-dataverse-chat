import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import { navigateTo } from "../router.js";
import dataset from "../data/dataset.js"; 
import { communicateWithOpenAI } from "../lib/openAIApi.js";

export const Chat = () => {
  const viewEl = document.createElement('section');
  viewEl.setAttribute("class", "view");

  viewEl.appendChild(Header());

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('id'); // Obtiene el ID del objeto desde la URL

  const selectedItem = dataset.find(item => item.id === itemId);

  if (selectedItem) {
    const CardChat = document.createElement('div');
    CardChat.innerHTML = `
      <section id=base>
        <div class="HomeContainer">
          <button id="BACK">←</button>
          <p>Volver a home</p>
        </div>
        
       <div class="DescriptionChat">
            <img class="imagenCard" src="${selectedItem.imageUrl}" alt="${selectedItem.name}" itemprop="image">
            <p itemprop="description" class="descriptionCard">${selectedItem.description}</p>
            <p itemprop="containsSeason" class="facts">Plataforma: ${selectedItem.facts.streamingPlatform}</p>
            <p itemprop="year">Transmisión: ${selectedItem.facts.yearOfRelease} - ${selectedItem.facts.yearOfEnd}</p>
            <p itemprop="rating">Rating: ${selectedItem.facts.averageRating} /10<span class="star">&#11088;</span></p>
       </div>
      </section>
    `;

    viewEl.appendChild(CardChat);

    const chatWindow = document.createElement('div');
    chatWindow.classList.add('chat-window'); 
    chatWindow.innerHTML=`
      <div class="HeaderChat">
        <img class="ImagenChat" src="${selectedItem.imageUrl}">
        <div class="chat-info">
          <p itemprop"PersonajeChat" class="PersonajeChat">${selectedItem.name}</p>
          <p itemprop"En linea" class="status"><Br>En Línea</p>
        </div>
      </div>
      <div class="message-container"></div> <!--contenedor para mensajes -->
      <div class="SendChat">
        <input type="text" id="input-user" placeholder="Interactúa con la serie aquí">
        <input type="submit" value="→" id="buttonSubmit">
      </div>
    `;

    viewEl.appendChild(chatWindow);
    
    const backButton = CardChat.querySelector('#BACK');
    const buttonSubmit = chatWindow.querySelector('#buttonSubmit');
    const userInput = chatWindow.querySelector('#input-user');
    const messageContainer = chatWindow.querySelector('.message-container');

    backButton.addEventListener('click', () => {
      navigateTo("/"); 
    });

    buttonSubmit.addEventListener("click", () => {
      const userMessage = userInput.value;

      communicateWithOpenAI(selectedItem, userMessage)
        .then((data) => {
          const userMessageEl = document.createElement('div');
          userMessageEl.classList.add('chat-message', 'user-message');
          userMessageEl.innerText = userMessage;

          const aiMessageEl = document.createElement('div');
          aiMessageEl.classList.add('chat-message', 'ai-message');
          aiMessageEl.innerText = data.choices[0].message.content;

          /*           chatWindow.appendChild(userMessageEl);
          chatWindow.appendChild(aiMessageEl); */
          messageContainer.appendChild(userMessageEl);
          messageContainer.appendChild(aiMessageEl);

          /* chatWindow.scrollTop = chatWindow.scrollHeight; */
          messageContainer.scrollTop = messageContainer.scrollHeight;

          userInput.value = "";
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error en la comunicación con OpenAI:", error);
        });
    });
  }

  viewEl.appendChild(Footer());

  return viewEl;
};