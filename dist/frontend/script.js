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
    title.setAttribute('class', 'title');
    title.innerHTML = `${movie.title}`; // query parameters
    const review = document.createElement('h2');
    review.setAttribute('class', 'reviewBtn');
    review.innerHTML = `<a href="reviews.html?id=${movie.id}&title=${movie.title}">reviews</a>`; // query parameters
    const titleReview = document.createElement('div');
    titleReview.setAttribute('class', 'title_review');
    titleReview.appendChild(title);
    titleReview.appendChild(review);
    const tags = document.createElement('div');
    tags.setAttribute('class', 'tags');
    tags.innerHTML = `<span class="genre_tag">action</span><span class="genre_tag">SF</span><span class="genre_tag">romance</span><span class="genre_tag">Horror</span><span class="genre_tag">thriller</span>`;
    movieCard.appendChild(poster);
    movieCard.appendChild(titleReview);
    movieCard.appendChild(tags);
    movieContainer.appendChild(movieCard);

    movieCard.addEventListener('click', (e) =>{
      //e.preventDefault();
      window.location.href = `movie-detail.html?${movie.id}`;
    });
  });
}