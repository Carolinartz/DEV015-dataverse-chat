export const Footer = () => {
  const footerElement = document.createElement("footer");
  footerElement.setAttribute("class","footer");
  footerElement.innerHTML = `<p> Creado por: Pascale Stavelot & Carolina Ortiz | dev015 | DV4 | 2024 © </p>`;
  return footerElement;
}