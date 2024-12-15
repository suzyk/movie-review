import '../styles/main.css';

const url = new URL(location.href);
const searchKeyword = url.searchParams.get("q");
// Get the path after "search-result/"
//const path = window.location.pathname;
//const segments = path.split('/');
// The search term should be the last segment
//const searchTerm = decodeURIComponent(segments[segments.length - 1]);

const keyword_header = document.querySelector('#search_keyword');
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; //1280 
const movieContainer = document.querySelector('.movies');
const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#query');
const searchCount = document.querySelector('#search_count');
const brandLogoImage = document.querySelector('#brand_logo_img');

keyword_header.textContent = searchKeyword;
let genres = {};

async function init() {
    brandLogoImage.addEventListener('click', (e) => {
        location.href = '/index.html';
      });
    await fetchGenres('http://localhost:8000/api/genres');
    await fetchMovies(`http://localhost:8000/api/search?term=${searchKeyword}`);
}

// Fetch genres and cache them in localStorage
async function fetchGenres(url){
    const savedGenres = localStorage.getItem('genres');
    if (savedGenres) {
        //return JSON.parse(savedGenres); // Return cached genres
        // Parse genres and convert keys back to numbers
        const parsedGenres = JSON.parse(savedGenres);
        genres = Object.fromEntries(
          Object.entries(parsedGenres).map(([key, value]) => [Number(key), value])
        );
    } else {
        try {
          //When you call fetch, it returns a promise, 
          //which represents an ongoing or "in-progress" operation 
          //to retrieve data from the server.
          // with await, the next line of code cannot be executed
          const response = await fetch(url); //ensuring synchronous execution
          const data = await response.json();
          genres = Object.fromEntries(data.genres.map(x => [x.id, x.name]));
          localStorage.setItem('genres', JSON.stringify(genres)); // Cache genres
        } catch (err) {
          console.error(err);
        }
    }
  }
  
  // Fetch movies after genres are loaded
  async function fetchMovies(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      renderMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  }

// event listener for search form
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      window.location.href = `/search-result.html?q=${encodeURIComponent(searchTerm)}`;
    }
  });

function renderMovies(movies){
    movieContainer.innerHTML = ''; // Clear the container before rendering new items

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movie');
    const poster = document.createElement('img');
    
    poster.src = IMG_PATH + movie.poster_path;
    if(movie.poster_path == null){
      poster.src = 'src/assets/placeholder2.png';
      poster.setAttribute('class', 'placeholder_img');
    }
    const title = document.createElement('h2');
    title.setAttribute('class', 'title');
    title.innerHTML = `${movie.title}`; // query parameters
    const review = document.createElement('h2');
    review.setAttribute('class', 'reviewBtn');
    review.innerHTML = `<a href="/reviews.html?id=${movie.id}&title=${movie.title}">reviews</a>`; // query parameters
    const titleReview = document.createElement('div');
    titleReview.setAttribute('class', 'title_review');
    titleReview.appendChild(title);
    titleReview.appendChild(review);
    const tags = document.createElement('div');
    tags.setAttribute('class', 'tags');
    for (const i in movie.genre_ids){
      const genre_id = movie.genre_ids[i]; 
      tags.innerHTML += `<span class="genre_tag">${genres[genre_id]}</span>`;
    
    }
    movieCard.appendChild(poster);
    if(movie.poster_path == null){
      const p_title = document.createElement('h2');
      p_title.setAttribute('class', 'placeholder_title');
      p_title.innerHTML = `${movie.title}`;
      movieCard.appendChild(p_title);
    }
    movieCard.appendChild(titleReview);
    movieCard.appendChild(tags);
    movieContainer.appendChild(movieCard);

    movieCard.addEventListener('click', (e) =>{
      //e.preventDefault();
      window.location.href = `/movie-detail.html?q=${movie.id}`;
    });
  });
  searchCount.innerHTML = `(${movies.length})`;
}

// Load data on page load
document.addEventListener("DOMContentLoaded", init);
