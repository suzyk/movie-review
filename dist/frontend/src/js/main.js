//import TopBar from '../components/topbar.html';
import '../styles/main.css';

const IMG_PATH = "https://image.tmdb.org/t/p/w500"; //1280 

const movieContainer = document.querySelector('.movies');
const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#query');
const brandLogoImage = document.querySelector('#brand_logo_img');

let genres = {};

// Ensure genres are fetched and cached before movies are fetched
async function init() {
  brandLogoImage.addEventListener('click', (e) => {
    location.reload();
  });
  await fetchGenres('/api/genres');
  await fetchMovies('/api/movies');
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
    window.location.href = `/search/${encodeURIComponent(searchTerm)}`;
  }
});

function renderMovies(movies){
  movieContainer.innerHTML = ''; // Clear the container before rendering new items

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
    review.innerHTML = `<a href="/reviews/${movie.id}?title=${encodeURIComponent(movie.title)}">reviews</a>`; // query parameters
    // href="/reviews.html?
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
    movieCard.appendChild(titleReview);
    movieCard.appendChild(tags);
    movieContainer.appendChild(movieCard);

    movieCard.addEventListener('click', (e) =>{
      // Vite's dev server expects a simple file-based URL like /movie.html
      window.location.href = `/movie/${movie.id}`; // this requires route handling
    });
  });
}

// Load data on page load
//document.body.insertAdjacentHTML('afterbegin', TopBar);
document.addEventListener("DOMContentLoaded", init);
