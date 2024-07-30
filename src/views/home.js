
import { Footer } from "../components/footer.js";
//import { navigateTo } from "../router.js";
import { Header } from "../components/header.js";
import { main } from "../components/main.js";
import { renderItems } from "../components/cards.js";
import dataset from "../data/dataset.js"

export function Principal(props) {
  const viewEl = document.createElement('div');
  viewEl.setAttribute("class","view");
  
  viewEl.appendChild(Header());
  viewEl.appendChild(main());
  const data = props?.data || dataset;
  viewEl.appendChild(renderItems(data)); //paso data a renderitems
  viewEl.appendChild(Footer());
  return viewEl;
}