import { Principal } from './views/home.js'; 
import { chatGrupal } from './views/groupChat.js';
// ... import other views
import { setRootEl, setRoutes, onURLChange } from './router.js';
//import dataset from './data/dataset.js';

// Define your routes and their associated views
const routes = {
  '/': Principal,
  '/chatGrupal': chatGrupal,
  
};
setRoutes(routes); // Assign the routes


// Set the root element where views will be rendered

window.addEventListener('DOMContentLoaded', () => { 
  const rootElement = document.getElementById("root");
  //const view = Principal ({ data: dataset });
  //rootElement.appendChild(view);

  //const header ???
  //constfooter ??
  setRootEl(rootElement);
  onURLChange();
});