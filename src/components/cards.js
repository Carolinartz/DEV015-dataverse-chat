import { navigateTo } from "../router.js";

export const renderItems = (data) => {
  const ulElement = document.createElement('ul');
  
  data.forEach(item => {
    const liElement = document.createElement('li');
    liElement.setAttribute('itemscope', ''); //Indica que el elemento y su contenido representan una entidad específica
    liElement.setAttribute('itemtype', 'http://schema.org/TVSeries'); //Especifica el tipo de entidad (una serie de televisión)
    liElement.setAttribute("data-id", item.id);
  
    //configurando el tooltip
    liElement.title = "¡Vamos a chatear!"; //añade el tooltip
    liElement.style.cursor = "pointer"; //cambia el cursor a pointer cuando pase sobre el elemento


    liElement.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" itemprop="image">
        <h3 itemprop="name" id="item-name"><strong>${item.name}</strong></h3>
        <h4 itemprop="containsSeason">${item.facts.streamingPlatform}</h4>
        <p itemprop="description">${item.shortDescription}</p>
        <div class="other-facts">
          <p itemprop="year"><span class="sizing">Transmisión: </span>${item.facts.yearOfRelease} - ${item.facts.yearOfEnd}</p>
          <p itemprop="rating"><span class="sizing">Rating: </span>${item.facts.averageRating} /10<span class="star">&#11088;</span></p>
        </div>  
        `;
   
    liElement.classList.add('item-style');
  
    ulElement.appendChild(liElement);
    //para navegar a la vista "chat" al hacer clic
    liElement.addEventListener('click', () => {
      //console.log(item.id)
      navigateTo("/chat", {id:item.id});
    }); 
  });
  return ulElement;
};
