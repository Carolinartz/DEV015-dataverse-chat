import { Footer } from "../components/footer.js";
import { navigateTo } from "../router.js";
import { Header } from "../components/header.js";
import { main } from "../components/main.js";
import { renderItems } from "../components/cards.js";
import dataset from "../data/dataset.js";
import { filterData, sortData, computeStats } from '../lib/dataFunctions.js';
import { modal } from "./viewApi.js";
import { getApiKey } from "../lib/apiKey.js";

export function Principal(props) {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class", "view");

  viewEl.appendChild(Header());
  const mainElement = main();
  viewEl.appendChild(mainElement);
  viewEl.appendChild(Footer());

  const data = props?.data || dataset;
  const originalData = [...data];

  const platformSelect = mainElement.querySelector('#platform');
  const sortBySelect = mainElement.querySelector('#sortBy');
  const buttonReset = mainElement.querySelector('#buttonClear');
  const buttonStats = mainElement.querySelector('#buttonStats');
  const resultsContainer = mainElement.querySelector('#results');
  const linkAPI = mainElement.querySelector('#modalLink');
  const ChatGrupal = mainElement.querySelector('#ChatGrupal')
  
  // Eliminamos la declaración de modalContainer
  // const modalContainer = mainElement.querySelector('#modal');

  if (platformSelect && sortBySelect && buttonReset && buttonStats && resultsContainer) {
    const renderFilteredData = () => {
      const platform = platformSelect.value;
      const sortByOption = sortBySelect.value.split('-');
      const sortBy = sortByOption[0];
      const sortOrder = sortByOption[1];

      let filteredData = dataset;
      if (platform) {
        filteredData = filterData(filteredData, 'streamingPlatform', platform);
      }

      if (sortBy && sortOrder) {
        filteredData = sortData(filteredData, sortBy, sortOrder);
      }

      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(filteredData));
    };

    platformSelect.addEventListener('change', renderFilteredData);
    sortBySelect.addEventListener('change', renderFilteredData);

    buttonReset.addEventListener('click', () => {
      platformSelect.selectedIndex = 0;
      sortBySelect.selectedIndex = 0;
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(renderItems(originalData));
    });

    buttonStats.addEventListener('click', () => {
      const stats = computeStats(dataset);
      resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
      `;
    });
    ChatGrupal.addEventListener('click', () => {
      if (!getApiKey()) {
        main.appendChild(modal())}
      navigateTo('/group-chat');
    });

    linkAPI.addEventListener('click', (event) => {
      event.preventDefault();
      
      // Crear y mostrar el modal con superposición
      const { overlay, viewApi } = modal();
      document.body.appendChild(overlay);
      viewApi.style.display = 'flex';
      overlay.style.display = 'flex';
    });

    resultsContainer.appendChild(renderItems(dataset));
  } else {
    // eslint-disable-next-line no-console
    console.error('Uno o más elementos no se pudieron seleccionar:', {
      platformSelect,
      sortBySelect,
      buttonReset,
      buttonStats,
      resultsContainer,
      linkAPI,
    });
  }

  return viewEl;
}
