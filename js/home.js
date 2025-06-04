window.addEventListener("load", function () {
  const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_URL = "https://image.tmdb.org/t/p/w200";

  const secciones = [
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
        const contenedor = document.querySelector(`#${seccion.id} .peliculas-home`);
        const resultados = data.results;

        for (let i = 0; i < 5; i++) {
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

          const estructura = `
            <article class="item">
              <a class="link" href="./detallespelicula.html?id=${item.id}&tipo=${seccion.tipo}">
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>Fecha de estreno: ${fecha}</p>
              </a>
            </article>
          `;

          contenedor.innerHTML += estructura;
        }
      })
      .catch(function (error) {
        console.log(`Error al cargar la sección ${seccion.id}:`, error);
      });
  }
});

