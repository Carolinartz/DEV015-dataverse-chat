import { Principal } from './views/home.js';
import { Chat } from './views/chat.js'; 
import { chatGrupal } from './views/groupChat.js';
import { Fail } from './views/error.js';
import { setRootEl, setRoutes, onURLChange } from './router.js';

// Define your routes and their associated views
const routes = {
  '/': Principal,
  '/error': Fail,
  '/chat': Chat, 
  '/group-chat': chatGrupal,
};

setRoutes(routes); // Assign the routes


window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  setRootEl(rootElement);
  onURLChange(); 
  
});