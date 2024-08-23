export const Footer = () => {
  const footerElement = document.createElement("footer");
  footerElement.setAttribute("class","footer");
  footerElement.innerHTML = `<p>Creado por: Carolina Ortiz & Pascale Stavelot</p><p>| DEV015 | DVC4 | 2024 ©</p>`;
  return footerElement;
}