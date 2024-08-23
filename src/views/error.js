import { Header } from "../components/header.js";
import { navigateTo } from "../router.js";
import { Footer } from "../components/footer.js";

export const Fail = () => {
  const viewEl = document.createElement('body');
  //asegurar que viewEl ocupe toda la altura de la ventana
  viewEl.style.display = 'flex';
  viewEl.style.flexDirection = 'column';
  viewEl.style.minHeight = '100vh'; // Asegura que ocupe toda la altura de la ventana
  // Crear y añadir Header
  const headerEl = Header();
  viewEl.appendChild(headerEl);

  // Crear y añadir contenido principal de la página de error
  const mainContent = document.createElement('div');
  mainContent.style.flexGrow = '1'; //ocupa el espacio disponible entre el header y el footer
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