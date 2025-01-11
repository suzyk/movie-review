import '../styles/main.css';
import placeholderImg from '/src/assets/placeholder2.png';
//import '/src/js/movie-detail.js';

const url = new URL(location.href);
//const movieID = url.searchParams.get("q");
const path = window.location.pathname;
const movieID = path.split('/').pop();

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
const trailers = document.getElementById('trailers');
const noTrailers = document.getElementById('no_trailers');
const brandLogoImage = document.querySelector('#brand_logo_img');

//const APILINK = 'http://localhost:8000/api/images';
const IMG_PATH = "https://image.tmdb.org/t/p/w300";
const LOGO_LINK = "https://image.tmdb.org/t/p/w300";
const BACKDROP_LINK = "https://image.tmdb.org/t/p/w1280";
const YOUTUBE_URL = "https://www.youtube.com/embed/";

var trailerContainerWidth = 0;

async function init() {
   await Promise.all([ 
    //   /api/movie → relative to the site root (good)
    //    api/movie → relative to the current page's path (bad)
    getLogo('/api/images'),
    getDetail('/api/movie'),
    getTrailers('/api/trailers')
  ]);
  // Calculate and set the margin after all data is loaded
  logoImage.onload = () => {
    const margin = 120 - 74 + logoImage.clientHeight + 40; 
    movieDetailContainer.style.marginTop = `${margin}px`;
  };
  brandLogoImage.addEventListener('click', (e) => {
    location.href = '/';
  });
}

function getLogo(url){
    fetch(`${url}/${movieID}`)
    .then(response => response.json())
    .then(response => {
        const logos = response.logos;
        if(Array.isArray(logos) && logos.length > 0){
          const logoPath = `${LOGO_LINK}${logos[0].file_path}`;
          logoImage.src = logoPath;
          logoImage.style.visibility = 'visible';
        }
    })
    .catch(err => {
      console.error(`error: ${err}`);
    });
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
      .then(response => {
        const videos = response.results;
        videos.forEach(video => {
          if (video.type == "Trailer"){
            //console.log(`${YOUTUBE_URL}${video.key}`);
            /*var obj = {"video": {
              "value": "<iframe title='YouTube video player' type=\"text/html\" width='640' height='390' src='http://www.youtube.com/embed/W-Q7RMpINVo' frameborder='0' allowFullScreen></iframe>"
            }}
            document.write(obj.video.value);*/
            //&origin=http://127.0.0.1:5500
            /*
            <iframe width="560" height="315" src="https://www.youtube.com/embed/VUCNBAmse04?si=m38yJR-J4tZGcHm0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            */
            trailers.innerHTML += `<iframe 
                                        title='YouTube video player'  
                                        type=\'text/html\' 
                                        width='400' 
                                        height='225'
                                        padding='25px' 
                                        src='${YOUTUBE_URL}${video.key}' 
                                        frameborder='0' 
                                        allowFullScreen
                                      ></iframe>`;
            trailerContainerWidth += 450;
          }
          trailers.style.width = `${trailerContainerWidth}px`;
          noTrailers.style.visibility = 'hidden';
        });
      })
      .catch(err => console.error(`error: ${err}`));
}

function renderDetailPage(movie){
    //console.log(movie);
    mainDetailContainer.style.backgroundImage = `url(${BACKDROP_LINK}${movie.backdrop_path})`;
    
    poster.src = `${IMG_PATH}${movie.poster_path}`;
    poster.onload = () =>{
      poster.style.visibility = 'visible';
    };
    if (movie.poster_path == null){
      poster.src = placeholderImg;
      poster.setAttribute('class', 'placeholder_img');
      poster.style.visibility = 'visible';
    }
    
    const fullDate = (movie.release_date).split('-');
    let releaseDate = fullDate[0];
    if (fullDate[0] != ''){
      releaseDate = `(${fullDate[0]})`;
    }
    title.innerHTML = `${movie.original_title} <span class="detail_releaseDate">${releaseDate}</span>`; //movie.original_title; 
  
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
    window.location.href = `/search/${encodeURIComponent(searchTerm)}`;
  }
});
// Load data on page load
document.addEventListener("DOMContentLoaded", init);
