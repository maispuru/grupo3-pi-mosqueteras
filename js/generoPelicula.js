window.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
    const BASE_URL = "https://api.themoviedb.org/3";
    const API_GENRE_MOVIE = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`;

    fetch(API_GENRE_MOVIE)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (data) {
            const contenedor = document.querySelector(".maingenero");
            let genresHTML = '';

            for (let i = 0; i < data.genres.length; i++) {
                const genre = data.genres[i];
                genresHTML += `
                    <section class="generopelicula">
                       <a class="link" href="./detalle-gen-peliculas.html?genre_id=${genre.id}&genre_name=${encodeURIComponent(genre.name)}">
                          <h2 class="titulosgeneropelicula">${genre.name}</h2>
                        </a>
                    </section>
                `;
            }

            contenedor.innerHTML = genresHTML;
        })
        .catch(function (error) {
            console.log("Error al cargar géneros:", error);
            const contenedor = document.querySelector(".maingenero");
            contenedor.innerHTML = '<p>Error cargando géneros. Intenta más tarde.</p>';
        });
});
 




