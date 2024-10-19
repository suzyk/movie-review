const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; //1280 
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const movieContainer = document.querySelector('.movies');
const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#query');

fetchMovies(APILINK);

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    movieContainer.innerHTML = "";
    if (searchInput.value) {
      fetchMovies(SEARCHAPI+searchInput.value);
      searchInput.value = ""
    }
});

function fetchMovies(url) {
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(response => renderMoies(response.results))
    .catch(err => console.error(err));
}

function renderMoies(movies){
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movie');
    const poster = document.createElement('img');
    poster.src = IMG_PATH + movie.poster_path;
    const title = document.createElement('h2');
    title.innerHTML = `${movie.title}<br><a href="movie.html?id=${movie.id}&title=${movie.title}">reviews</a>`; // query parameters
    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieContainer.appendChild(movieCard);
  });
}