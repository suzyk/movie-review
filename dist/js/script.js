//const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w500"; 
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const movieContainer = document.querySelector('.movies');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2ZjU3ZDIzMmQ3NjFmM2ZjYTIwNzU0ZTA1MmI3YyIsIm5iZiI6MTcyODgxMTcyNy41OTc4ODMsInN1YiI6IjY3MGI5MDU2YjE1ZDk3YjFhOTNjNzIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rvrJJp-oSdiKtepaWopvATg7VZSlFwkiUXIed5sX46A'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => renderMovies(response.results))
    .catch(err => console.error(err));


function renderMovies(movies) {
    //console.log(movies);
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.setAttribute('class', 'movie');
      const poster = document.createElement('img');
      poster.src = IMG_PATH + movie.poster_path;
      const title = document.createElement('h2');
      title.innerText = movie.title;
      movieCard.appendChild(poster);
      movieCard.appendChild(title);
      movieContainer.appendChild(movieCard);
    });
    
}

