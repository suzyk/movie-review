// Express : fast and light framework for node.js
// easy to make our http entry-points for our server

import express from "express";
import cors from "cors";
import 'dotenv/config';
import axios from 'axios';
import reviews from "./api/reviews.route.js";

/*
const port = process.env.PORT || 2000;
const app = express();
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`mongo user and password ${process.env.MONGO_USERNAME}, ${process.env.MONGO_PASSWORD}`);
});
*/
const movie_api_key = process.env['API_KEY'];

const app = express();

app.use(cors());
app.use(express.json());

/* Movie detail
const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2ZjU3ZDIzMmQ3NjFmM2ZjYTIwNzU0ZTA1MmI3YyIsIm5iZiI6MTczMDIzMzA2Mi42Mzg4NzcyLCJzdWIiOiI2NzBiOTA1NmIxNWQ5N2IxYTkzYzcyMWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LpPEM1TM39RdQ3BKq6oLgVSr2hZs6bf36jw4FD0SOYA'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
*/


// Serve static files from the "dist" directory
//app.use(express.static('dist'));

app.get('/api/movie_detail', async(req, res) => {
  const movieId = req.query.movieId;
  if (!movieId) {
    return res.status(400).send('Movie ID is required');
  }
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: movie_api_key,
        language: 'en-US'
      }
    });
    res.json(response.data);
  }catch (error){
    console.error(error);
    res.status(500).send('Error fetching movie detail');
  }
});

app.get('/api/images', async(req, res) => {
  // there is query / params
  //movie_id is now part of the route, like /api/images/1184918 (in express)
  //Path parameters address/id VS query parameters address?term=1234
  const movieId = req.query.movieId;
  //req.params.movie_id; // Assuming you pass movie_id as a query parameter
  console.log(movieId);
  if (!movieId) {
    return res.status(400).send('Movie ID is required');
  }
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
      params: {
        api_key: movie_api_key,
        include_image_language: 'en'
      }
    });
    /*
    response.data: Contains the actual data from the API response (i.e., the payload we usually want).
    response.status: The HTTP status code (e.g., 200 for success).
    response.headers
*/
    res.json(response.data);
  }catch (error){
    console.error(error);
    res.status(500).send('Error fetching images');
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        params: {
          api_key: movie_api_key
        }
    });
    res.json(response.data);
  }catch (error){
    console.error(error);
    res.status(500).send('Error fetching genres');
  }
});
// Endpoint to fetch movie data
app.get('/api/movies', async (req, res) => {
  try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
              sort_by: 'popularity.desc',
              api_key: movie_api_key,
              page: 1
          }
      });
      //console.log('API Response Status:', response.status); // Log status code
      //console.log('API Response Data:', response.data); // Log the actual data returned

      res.json(response.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching movies');
  }
});
/*
// Rewrite route for search results with path parameter
app.get('/search-result/:term', (req, res) => {
  // `term` can be accessed via req.params.term for further processing if needed
  res.sendFile(__dirname + '/dist/frontend/search-result.html');
});
*/

app.get('/api/search', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: movie_api_key,
        query: req.query.term
      }
    });
    res.json(response.data);
  }catch (error){
    console.error(error);
      res.status(500).send('Error fetching movies');
  }
});

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => res.status(404).json({error: "not found"})); // * means anything else

// export our app as a module
 export default app;
