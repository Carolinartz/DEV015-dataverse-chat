
export const main = () => {
  const mainElement = document.createElement("main");
  mainElement.innerHTML = `
      <section class="SecondContainer">
        <div class="description-container">
          <h2>¡Bienvenid@ al fascinante universo de las series de ciencia ficción!</h2>
          <br>
          <h3>Desde galaxias lejanas hasta distopías futuristas, aquí cubrimos todo lo que necesitas saber para convertirte en el experto que siempre quisiste ser.</h3>
        </div>

        <div class="FiltroContainer">
        
            <label for="platform">Filtrar por:</label>
            <select data-testid="select-filter" name="platform" id="platform">
              <option value="" disabled selected>Filtrar por:</option>
              <option value="Adult Swim">Adult Swim</option>
              <option value="Amazon Prime Video">Amazon Prime Video</option>
              <option value="BBC">BBC</option>
              <option value="CBS">CBS</option>
              <option value="Disney+">Disney+</option>
              <option value="Fox">Fox</option>
              <option value="HBO">HBO</option>
              <option value="Hulu">Hulu</option>
              <option value="Netflix">Netflix</option>
              <option value="Showtime">Showtime</option>
              <option value="Syfy">Syfy</option>
              <option value="The CW">The CW</option>
            </select>
            <label for="sortBy">Ordenar por:</label>
            <select data-testid="select-sort" name="sortBy" id="sortBy">
              <option value="" disabled selected>Ordenar por:</option>
              <optgroup label="Título">
                <option value="name-asc">A a Z</option>
                <option value="name-desc">Z a A</option>
              </optgroup>
              <optgroup label="Año de lanzamiento">
                <option value="yearOfRelease-asc">Más antiguas</option>
                <option value="yearOfRelease-desc">Más recientes</option>
              </optgroup>
              <optgroup label="Rating promedio">
                <option value="averageRating-asc">Peor rating</option>
                <option value="averageRating-desc">Mejor rating</option>
              </optgroup>
            </select>

          <div class="button-container">
            <button data-testid="button-clear" id="buttonClear">Limpiar filtros</button>
            <button id="buttonStats">Estadística</button>
            <button id="ChatGrupal">Chat Grupal</button>
          </div>
          <p class="API"><a href="#" id="modalLink">Api Key</a>.</p>
        </div>
      </section>
      <div id="results"></div>
      
    `
  return mainElement;
};