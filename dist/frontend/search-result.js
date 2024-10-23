const url = new URL(location.href);
const searchKeyword = url.searchParams.get("q");
const keyword_header = document.querySelector('#search_keyword');
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; //1280 
const movieContainer = document.querySelector('.movies');

keyword_header.textContent = searchKeyword;

fetchMovies();

function fetchMovies() {
    console.log(url);
    fetch(`http://localhost:8000/api/search?term=${searchKeyword}`)
      .then(response => response.json())
      .then(response => renderMovies(response.results))
      .catch(err => console.error(err));
}

function renderMovies(movies){
    //console.log(movies); genre_ids
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