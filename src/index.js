import { Principal } from './views/home.js'; 
import { chatGrupal } from './views/groupChat.js';
// ... import other views
import { setRootEl, setRoutes, onURLChange } from './router.js';
//import dataset from './data/dataset.js';
import { filterData, sortData, computeStats } from './lib/dataFunctions.js'
import { renderItems } from './components/cards.js'
import data from './data/dataset.js'
import { main } from './components/main.js'
// Define your routes and their associated views
const routes = {
  '/': Principal,
  '/chatGrupal': chatGrupal,
  
};
setRoutes(routes); // Assign the routes


// Set the root element where views will be rendered

/*window.addEventListener('DOMContentLoaded', () => { 
  const rootElement = document.getElementById("root");
  //const view = Principal ({ data: dataset });
  //rootElement.appendChild(view);

  //const header ???
  //constfooter ??
  
});*/

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  if (rootElement) {
    rootElement.appendChild(main());
    const platformSelect = document.querySelector('#platform');
    const sortBySelect = document.querySelector('#sortBy');
    const buttonReset = document.querySelector('#buttonClear');
    const buttonStats = document.querySelector('#buttonStats');
    const resultsContainer = document.querySelector('#results');

    if (platformSelect && sortBySelect && buttonReset && buttonStats && resultsContainer) {

      const originalData = [...data];


      //función para renderizar datos filtrados y ordenados
      const renderFilteredData = () => {
        const platform = platformSelect.value;
        const sortByOption = sortBySelect.value.split('-');
        const sortBy = sortByOption[0];
        const sortOrder = sortByOption[1];

        let filteredData = data;
        if (platform) { //filtra por plataforma si está seleccionada
          filteredData = filterData(filteredData, 'streamingPlatform', platform);
        }

        if (sortBy && sortOrder) { //ordena los datos si se ha seleccionado una opción de ordenar
          filteredData = sortData(filteredData, sortBy, sortOrder);
        }

        rootElement.innerHTML = ''; //limpia el contenido previo
        rootElement.appendChild(renderItems(filteredData));
      };

      //Manejador de eventos para actualizar vista cuando sucedan los filtros/orden
      platformSelect.addEventListener('change', renderFilteredData);
      sortBySelect.addEventListener('change', renderFilteredData);
  
      //Botón para limpiar datos seleccionados
      buttonReset.addEventListener('click', () => {
        sortBySelect.selectedIndex = 0; 
        platformSelect.selectedIndex = 0;  
        rootElement.innerHTML = '';       
        rootElement.append(renderItems(originalData)); 
      });
  
      //Botón para mostrar estadísticas
      buttonStats.addEventListener('click', () => {
        const stats = computeStats(data);
      
        const resultsContainer = document.querySelector('#results');
        resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
         `;
      });  
      //setRootEl(rootElement);
      rootElement.appendChild(renderItems(data));
      //onURLChange();
      
    }
  }
});