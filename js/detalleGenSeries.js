window.addEventListener("load", function () {
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
        .then(respuesta => respuesta.json())
        .then(data => {
            const contenedor = document.querySelector(".divdetallegenero");
            let html = "";

            for (let i = 0; i < data.results.length; i++) {
                const serie = data.results[i];
                html += `
                    <article>
                        <h3>${serie.name}</h3>
                        <p>${serie.first_air_date}</p>
                        <a href="./detalle-gen-series.html?id=${serie.id}">Ver más</a>
                    </article>
                `;
            }

            contenedor.innerHTML = html;
        })
        .catch(error => {
            console.log("Error al cargar series:", error);
        });
});