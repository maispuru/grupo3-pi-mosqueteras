window.addEventListener("DOMContentLoaded", function () {
  let API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
  let BASE_URL = "https://api.themoviedb.org/3";
  let IMG_URL = "https://image.tmdb.org/t/p/w200";

  let secciones = [
    {
      id: "peliculas-populares",
      endpoint: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es&page=1`,
      tipo: "pelicula",
    },
    {
      id: "series-populares",
      endpoint: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es&page=1`,
      tipo: "serie",
    },
    {
      id: "peliculas-valoradas",
      endpoint: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es&page=1`,
      tipo: "pelicula",
    }
  ];

  for (let i = 0; i < secciones.length; i++) {
    let seccion = secciones[i];

    fetch(seccion.endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let contenedor = document.querySelector(`#${seccion.id}`);
        let resultados = data.results;
        let estructura = "";
        for (let i = 0; i < 4; i++) {
          let item = resultados[i];

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

          estructura += `
            <article class="item">
              <a class="link" href="./detalles${seccion.tipo}.html?id=${item.id}&tipo=${seccion.tipo}">
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>Fecha de estreno: ${fecha}</p>
              </a>
            </article>
          `;

          
        }

        contenedor.innerHTML += estructura;
      })
      .catch(function (error) {
        console.log(`Error al cargar la sección ${seccion.id}:`, error);
      });
  }
});

