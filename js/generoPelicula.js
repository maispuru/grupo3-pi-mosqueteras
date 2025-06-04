window.addEventListener("load", function () {
    const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
    const BASE_URL = "https://api.themoviedb.org/3";
    
    const API_GENRE_MOVIE = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`;

    fetch(API_GENRE_MOVIE)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (data) {
            let contenedor = document.querySelector(".maingenero");
            let genres = data.genres;

            genres.forEach(function (genre) {
                let section = document.createElement("section");
                section.classList.add("generopelicula");

                let link = document.createElement("a");
                link.classList.add("link");
                link.href = `./detallegenero.html?genre_id=${genre.id}&genre_name=${encodeURIComponent(genre.name)}`;

                let h2 = document.createElement("h2");
                h2.classList.add("titulosgeneropelicula");
                h2.innerText = genre.name;

                link.appendChild(h2);
                section.appendChild(link);
                contenedor.appendChild(section);
            });
        })
        .catch(function (error) {
            console.log("Error al cargar géneros:", error);
            let contenedor = document.querySelector(".maingenero");
            contenedor.innerHTML = '<p>Error cargando géneros. Intenta más tarde.</p>';
        });
});
