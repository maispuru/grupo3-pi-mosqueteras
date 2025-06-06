window.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4";
    const BASE_URL = "https://api.themoviedb.org/3";

    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const idGenero = params.get("genre_id");
    const nombreGenero = params.get("genre_name");

    const tituloGenero = document.querySelector(".titulosdetalle");
    tituloGenero.innerText = nombreGenero;

    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${idGenero}&language=es-ES`;

    fetch(url)
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(data) {
        const contenedor = document.querySelector(".divdetallegenero");
        let html = "";

        for (let i = 0; i < data.results.length; i++) {
            const serie = data.results[i];
            html += `
                <article class="artdetallegenero">
                    <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="Poster of ${serie.name}">
                    <h3>${serie.name}</h3>
                    <a href="./detallesserie.html?id=${serie.id}">Ver más</a>
                </article>
            `;
        }

        contenedor.innerHTML = html;
    })
    .catch(function(error) {
        console.log("Error al cargar series:", error);
    });

}); 
