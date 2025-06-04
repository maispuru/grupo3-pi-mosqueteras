window.addEventListener("load", function () {
 
  let tituloPrincipal = document.querySelector(".mainTitle");
  tituloPrincipal.style.fontSize = "24px";
  tituloPrincipal.innerText += " desde TMDb";

  
  const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w200";

  const secciones = {
    "peliculas-populares": `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es`,
    "series-populares": `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es`,
    "peliculas-valoradas": `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es`,
  };

  for (let id in secciones) {
    fetch(secciones[id])
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (data) {
        let contenedor = document.querySelector(`#${id}`);
        let items = data.results;

        for (let i = 0; i < 5; i++) {
          let item = items[i];
          let titulo = item.title || item.name;
          let fecha = item.release_date || item.first_air_date;
          let tipo = item.title ? "pelicula" : "serie";

          let div = document.createElement("div");
          div.classList.add("item");

          div.innerHTML = `
            <a href="detalle.html?id=${item.id}&tipo=${tipo}">
              <img src="${IMG_URL + item.poster_path}" alt="${titulo}" />
              <p>${titulo}</p>
              <small>${fecha}</small>
            </a>
          `;

          div.addEventListener("mouseover", function () {
            console.log("Elemento:", this);
            this.style.backgroundColor = "#f0f0f0";
          });

          contenedor.appendChild(div);
        }
      })
      .catch(function (error) {
        console.log("Error al cargar sección:", id, error);
      });
  }

  
  let botonBuscar = document.querySelector("button");
  botonBuscar.addEventListener("click", function () {
    console.log("Hiciste click en el botón:", this);
  });
});
