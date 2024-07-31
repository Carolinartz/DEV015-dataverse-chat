import { Principal } from './views/home.js'; 
import { chatGrupal } from './views/groupChat.js';
// ... import other views
import { setRootEl, setRoutes, onURLChange } from './router.js';
//import dataset from './data/dataset.js';
import { filterData, sortData, computeStats } from './lib/dataFunctions.js'
import { renderItems } from './components/cards.js'
import data from './data/dataset.js'
import { main } from './components/main.js'
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';



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

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  setRootEl(rootElement);
  onURLChange(); 
  rootElement.appendChild(Header());
  rootElement.appendChild(main());

  const platformSelect = document.querySelector('#platform');
  const sortBySelect = document.querySelector('#sortBy');
  const buttonReset = document.querySelector('#buttonClear');
  const buttonStats = document.querySelector('#buttonStats');
  const resultsContainer = document.querySelector('#results');

  const originalData = [...data];

  //console.log({ platformSelect, sortBySelect, buttonReset, buttonStats, resultsContainer }); 

  if (platformSelect && sortBySelect && buttonReset && buttonStats && resultsContainer) {

    const renderFilteredData = () => {
      const platform = platformSelect.value;
      const sortByOption = sortBySelect.value.split('-');
      const sortBy = sortByOption[0];
      const sortOrder = sortByOption[1];

      let filteredData = data;
      if (platform) {
        filteredData = filterData(filteredData, 'streamingPlatform', platform);
      }

      if (sortBy && sortOrder) {
        filteredData = sortData(filteredData, sortBy, sortOrder);
      }

      //console.log('Filtered Data:', filteredData); 
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(filteredData));
    };

    platformSelect.addEventListener('change', () => {
      //console.log('Platform changed:', platformSelect.value);
      renderFilteredData();
    });

    sortBySelect.addEventListener('change', () => {
      // console.log('Sort by changed:', sortBySelect.value);
      renderFilteredData();
    });

    buttonReset.addEventListener('click', () => {
      //console.log('Reset button clicked');
      platformSelect.selectedIndex = 0;
      sortBySelect.selectedIndex = 0;
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(originalData));
    });

    buttonStats.addEventListener('click', () => {
      //console.log('Stats button clicked');
      const stats = computeStats(data);
      //console.log('Stats:', stats); // Debugging
      resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
      `;
    });

    resultsContainer.appendChild(renderItems(data));
  }

  rootElement.appendChild(Footer());
});
