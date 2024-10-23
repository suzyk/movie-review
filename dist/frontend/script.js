const IMG_PATH = "https://image.tmdb.org/t/p/w500"; //1280 

const movieContainer = document.querySelector('.movies');
const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#query');

fetchMovies('http://localhost:8000/api/movies');

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      window.location.href = `search-result.html?q=${encodeURIComponent(searchTerm)}`;
    }
});

function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(response => renderMovies(response.results))
    .catch(err => console.error(err));

}

function renderMovies(movies){
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