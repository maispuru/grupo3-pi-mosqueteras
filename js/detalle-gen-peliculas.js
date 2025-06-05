window.addEventListener("load", function () {
    const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
    const BASE_URL = "https://api.themoviedb.org/3";
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genre_id');
    const genreName = decodeURIComponent(urlParams.get('genre_name')); 
    const tituloGenero = document.querySelector(".titulosdetalle");
    tituloGenero.textContent = genreName;
    const API_GENRE_MOVIE = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES`; 
   console.log("Genre ID:", genreId);
   console.log("Genre Name:", genreName);
    fetch(API_GENRE_MOVIE)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (data) {
            const contenedorPeliculas = document.querySelector(".divdetallegenero");
            let peliculasHTML = '';

            data.results.forEach(function (pelicula) {
                peliculasHTML += `
                    <article class="artdetallegenero">
                        <a class="link" href="./detallespelicula.html?id=${pelicula.id}">
                            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                            <h3>${pelicula.title}</h3>
                            <p>Fecha de estreno: ${pelicula.release_date}</p>
                        </a>
                    </article>
                `;
            });

            contenedorPeliculas.innerHTML = peliculasHTML;
        })
        .catch(function (error) {
            console.log("Error al cargar las peliculas:", error);
            const contenedorPeliculas = document.querySelector(".divdetallegenero");
            contenedorPeliculas.innerHTML = '<p>Error cargando peliculas. Intenta más tarde.</p>';
        });
}); 