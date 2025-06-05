window.addEventListener("load", function () {
  const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4";
  const BASE_URL = "https://api.themoviedb.org/3";

  let queryString = location.search;
  let queryStringObj  = new URLSearchParams(queryString);
  const idPelicula = queryStringObj.get("id");

let titulo = document.querySelector ("h1")
let imagen = document.querySelector (".imagen")
let clasificacion = document.querySelector (".Clasificacion-detalles")
let estreno = document.querySelector (".estreno-detalles")
let genero = document.querySelector (".genero-detalles")
let sinopis = document.querySelector (".Sinopsis-detalles")

 const url = `${BASE_URL}/movie/${idPelicula}?api_key=${API_KEY}&language=es-ES`;

fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      titulo.innerText = data.title;
      clasificacion.innerHTML +=`${data.vote_average}`;
      estreno.innerHTML += `${data.release_date}`;
      sinopis.innerHTML += `${data.overview}`;
      let generos = "";
for (let i = 0; i < data.genres.length; i++) {
  let generoActual = data.genres[i];
  generos += `<a class="link-detalles" href="./detalle-gen-peliculas.html?id=${generoActual.id}&type=movie">${generoActual.name}</a> `;
}
     genero.innerHTML += generos;
    })
.catch(function (error) {
  console.log("Error:", error);
})
})