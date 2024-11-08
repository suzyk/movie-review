const url = new URL(location.href);
const movieID = url.searchParams.get("q");
//const path = window.location.pathname;
//const segments = path.split('/');
//const movieID = segments[segments.length - 1];
console.log(`movie = ${movieID}`);

const movieMain = document.querySelector('.movie_detail_main');
const movieDetailContainer = document.querySelector('.movie_detail_container');
const mainDetailContainer = document.querySelector('.main_detail');
const logoImage = document.querySelector('#logoImage');
const searchForm = document.querySelector('#form');
const searchInput = document.querySelector('#query');
const poster = document.querySelector('#detail_poster');
const title = document.querySelector('.detail_title');
const genre_runTime = document.querySelector('.detail_genre_runTime');
const rating = document.querySelector('.detail_rating');
const tagline = document.querySelector('.detail_tagline');
const overview = document.querySelector('.detail_overview');

//const APILINK = 'http://localhost:8000/api/images';
const IMG_PATH = "https://image.tmdb.org/t/p/w300";
const LOGO_LINK = "https://image.tmdb.org/t/p/w300";
const BACKDROP_LINK = "https://image.tmdb.org/t/p/w1280";


async function init() {
   await Promise.all([ 
    getLogo('http://localhost:8000/api/images'),
    getDetail('http://localhost:8000/api/movie_detail'),
    getTrailers('http://localhost:8000/api/trailers')
  ]);
  // Calculate and set the margin after all data is loaded
  logoImage.onload = () => {
    const margin = 120 - 74 + logoImage.clientHeight + 40; 
    movieDetailContainer.style.marginTop = `${margin}px`;
};
}

function getLogo(url){
    fetch(`${url}/${movieID}`)
    .then(response => response.json())
    .then(response => {
        const logos = response.logos;
        const logoPath = `${LOGO_LINK}${logos[0].file_path}`;
        logoImage.src = logoPath;
    })
    .catch(err => console.error(`error: ${err}`));
}
function getDetail(url){
    fetch(`${url}/${movieID}`)
    .then(response => response.json())
    .then(response => renderDetailPage(response))
    .catch(err => console.error(`error: ${err}`));
}

function getTrailers(url){
    fetch(`${url}/${movieID}`)
      .then(response => response.json())
      .then(response => console.log(response.results))
      .catch(err => console.error(`error: ${err}`));
}

function renderDetailPage(movie){
    //console.log(movie);
    console.log(`${BACKDROP_LINK}${movie.backdrop_path}`);
    mainDetailContainer.style.backgroundImage = `url(${BACKDROP_LINK}${movie.backdrop_path})`;
    poster.src = `${IMG_PATH}${movie.poster_path}`;
    const fullDate = (movie.release_date).split('-');
    title.innerHTML = `${movie.original_title} <span class="detail_releaseDate">(${fullDate[0]})</span>`; //movie.original_title; 
  
    for (const i in movie.genres){
        const genre = movie.genres[i]; 
        genre_runTime.innerHTML += `<span class="detail_genre_tag">${genre.name}</span>`;
    }
    const runtimeHour = Math.floor(movie.runtime/60);
    const runtimeMinute = movie.runtime % 60;
    genre_runTime.innerHTML += `<span class="detail_runtime">| ${runtimeHour}h ${runtimeMinute}m</span>`;
    rating.innerHTML = (movie.vote_average).toFixed(1);
    tagline.innerHTML = movie.tagline;
    overview.innerHTML = movie.overview;
    
}

// event listener for search form
searchForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    window.location.href = `search-result.html?q=${encodeURIComponent(searchTerm)}`;
  }
});
// Load data on page load
document.addEventListener("DOMContentLoaded", init);

