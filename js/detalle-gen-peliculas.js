window.addEventListener("load", function () {
    const API_KEY = "9731aaf98dbc7db52a32fb77a340e7c4"; 
    const BASE_URL = "https://api.themoviedb.org/3";
    const urlParams = new URLSearchParams(window.location.search);
    const genreId = urlParams.get('genre_id');
    const genreName = decodeURIComponent(urlParams.get('genre_name')); 