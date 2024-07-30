import data from "../data/dataset.js";
import { filterData, sortData, computeStats } from "../lib/dataFunctions.js";


export const renderItems = (data) => {
  const ulElement = document.createElement('ul');
  
  data.forEach(item => {
    const liElement = document.createElement('li');
    liElement.setAttribute('itemscope', ''); //Indica que el elemento y su contenido representan una entidad específica
    liElement.setAttribute('itemtype', 'http://schema.org/TVSeries'); //Especifica el tipo de entidad (una serie de televisión)
    liElement.setAttribute("data-id", item.id);
  
    liElement.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" itemprop="image">
        <h3 itemprop="name" id="item-name"><strong>${item.name}</strong></h3>
        <h4 itemprop="containsSeason">${item.facts.streamingPlatform}</h4>
        <p itemprop="description">${item.shortDescription}</p>
        <p itemprop="year"><span class="sizing">Transmisión: </span>${item.facts.yearOfRelease} - ${item.facts.yearOfEnd}</p>
        <p itemprop="rating"><span class="sizing">Rating: </span>${item.facts.averageRating} /10<span class="star">&#11088;</span></p>`;
    //cambios en h3 item name 
    liElement.classList.add('item-style');
  
    ulElement.appendChild(liElement);
  });
  return ulElement;
};

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.querySelector('#root');
  const platformSelect = document.querySelector('#platform');
  const sortBySelect = document.querySelector('#sortBy');
  const buttonReset = document.querySelector('#buttonClear');
  const buttonStats = document.querySelector('#buttonStats');


  const originalData = [...data];

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

    rootElement.innerHTML = ''; 
    rootElement.appendChild(renderItems(filteredData));
  };

  platformSelect.addEventListener('change', renderFilteredData);
  sortBySelect.addEventListener('change', renderFilteredData);

  buttonReset.addEventListener('click', () => {
    sortBySelect.selectedIndex = 0; 
    platformSelect.selectedIndex = 0;  
    rootElement.innerHTML = '';       
    rootElement.append(renderItems(originalData)); 
  });
  
  buttonStats.addEventListener('click', () => {
    const stats = computeStats(data);
      
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = `
        <h4><span class="highlight">${stats.avgYears.toFixed(2)} años</span> promedia una transmisión.</h4>
         `;
  });  
});