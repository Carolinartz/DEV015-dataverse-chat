export const Header = () => {
  const headerElement = document.createElement("header");
  headerElement.innerHTML= `
  <div class="header-container">
        <h1>Sci-fi Data</h1>
      </div>
  `;
  return headerElement;
}