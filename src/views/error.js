import { Header } from "../components/header.js";
import { navigateTo } from "../router.js";
import { Footer } from "../components/footer.js";

export const Fail = () => {
  const viewEl = document.createElement('div');
  // Crear y añadir Header
  const headerEl = Header();
  viewEl.appendChild(headerEl);

  // Crear y añadir contenido principal de la página de error
  const mainContent = document.createElement('div');
  mainContent.innerHTML = `
  <link rel="stylesheet" href="assets/CSS/styleFail.css">
  <picture class="sciFiError">
      <img src="assets/img/deadRobot.png" alt="unarmed robot">
  </picture>
  <h1 class="errorNum">404</h1>
  <h2 class="headingError">¡Ups! Página no encontrada</h2>
  <button id="backHome">Volver a home</button>
`;
  viewEl.appendChild(mainContent);

  // Crear y añadir Footer
  const footerEl = Footer();
  viewEl.appendChild(footerEl);

  //Botón para regresar a Home
  const buttonBackHome = viewEl.querySelector('#backHome');
  buttonBackHome.addEventListener('click', () => navigateTo("/"));
  
  return viewEl;
};