window.addEventListener("load", function () {
  const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4";
  const BASE_URL = "https://api.themoviedb.org/3";

  let queryString = location.search;
  let queryStringObj  = new URLSearchParams(queryString);
  const idSerie = queryStringObj.get("id");

let titulo = document.querySelector ("h1")
let imagen = document.querySelector (".imagen-detalle-serie")
let clasificacion = document.querySelector (".Clasificacion-detalles-serie")
let estreno = document.querySelector (".estreno-detalles-serie")
let genero = document.querySelector (".genero-detalles-serie")
let sinopis = document.querySelector (".Sinopsis-detalles-serie")

 const url = `${BASE_URL}/tv/${idSerie}?api_key=${API_KEY}&language=es-US`;

fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      titulo.innerText = data.name;
      imagen.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      clasificacion.innerHTML = `<p class="Clasificacion-detalles-serie"> <strong>Clasificacion:</strong> ${data.vote_average} </p>` ;
      estreno.innerHTML = `<p class="estreno-detalles-serie"><strong>Fecha de estreno:</strong> ${data.release_date} </p>` ;
      sinopis.innerHTML = `<p class="Sinopsis-detalles-serie"><strong>Sinopsis: </strong> ${data.overview}</p>` ;
      let generos = "";
for (let i = 0; i < data.genres.length; i++) {
   let generoActual = data.genres[i];
   generos += `<a href="./detalle-gen-series.html?genre_id=${generoActual.id}&genre_name=${encodeURIComponent(generoActual.name)}">${generoActual.name}</a>`;
    if (i !== data.genres.length - 1) {
    generos += ", "; 
}
}
     genero.innerHTML = `<p class="genero-detalles-serie"> <strong> Genero: </strong> ${generos} </p>`;
     })
.catch(function (error) {
  console.log("Error:", error);
})
})
