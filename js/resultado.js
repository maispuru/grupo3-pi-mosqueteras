document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w200";

  
  const queryString = location.search;
  const queryStringObj = new URLSearchParams(queryString);

  const termino = queryStringObj.get("search");
  const tipo = queryStringObj.get("tipo"); 

  
  const tituloBusqueda = document.querySelector("#titulo-busqueda");
  const contenedorResultados = document.querySelector("#contenedor-resultados");
  const mensajeVacio = document.querySelector("#no-resultados");
  const cargando = document.querySelector("#cargando");

 
  tituloBusqueda.innerText = `Resultados de búsqueda para: "${termino}"`;
  

  
  let url = "";
  if (tipo == "pelicula") {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es&query=${termino}`;
  } else {
    url = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=es&query=${termino}`;
  }

  
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cargando.style.display = "none";

      const resultados = data.results;

      if (resultados.length === 0) {
        mensajeVacio.style.display = "block";
      } else {
        for (let i = 0; i < resultados.length; i++) {
          const item = resultados[i];

          
          let titulo;
          if (item.title) {
            titulo = item.title;
          } else {
            titulo = item.name;
          }

          
          let fecha;
          if (item.release_date) {
            fecha = item.release_date;
          } else {
            fecha = item.first_air_date;
          }

         
          let imagen;
          if (item.poster_path) {
            imagen = IMG_URL + item.poster_path;
          } else {
            imagen = "./img/placeholder.jpg";
          }

          
          let estructura = `
            <article class="item">
              <a class="link" href="./detallespelicula.html?id=${item.id}&tipo=${tipo}">
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>Fecha de estreno: ${fecha}</p>
              </a>
            </article>
          `;

          contenedorResultados.innerHTML += estructura;
        }
      }
    })
    .catch(function (error) {
      cargando.style.display = "none";
      mensajeVacio.innerText = "Ocurrió un error al buscar.";
      mensajeVacio.style.display = "block";
      console.log("El error es: " + error);
    });
});
