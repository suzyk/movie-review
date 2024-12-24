// Express : fast and light framework for node.js
// easy to make our http entry-points for our server

import express from "express";
import cors from "cors";
import 'dotenv/config';
import axios from 'axios';
import reviews from "./api/reviews.route";

//import movie from "./api/movies.route.ts";
import path from "path"; //which allows you to use path.join()
//import { fileURLToPath } from 'url';
//const path = require('path');

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
app.use(function(req, res, next) {  // http://127.0.0.1:5500  http://localhost:5500
  const corsWhitelist = [
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ];
  if (req.headers.origin != undefined && corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
   // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
// Serve the files from Vite's build output
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
console.log('Static file path:', path.join(__dirname, '../../frontend/dist'));
/*
app.get('/', (req, res) => {
  res.send('API is working!');
});*/

// The order of these routes is important. 
//Put the /api/movie/:id route before the /movie/:id route 
//so that the API request is matched first.

app.get('/api/movie/:id', async(req, res) => {
  //const movieId = req.query.movieId;
  const movieId = req.params['id'];
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

app.get('/api/images/:id', async(req, res) => {
  // there is query / params
  //movie_id is now part of the route, like /api/images/1184918 (in express)
  //Path parameters address/id VS query parameters address?term=1234
  //const movieId = req.query.movieId;
  const movieId = req.params['id'];
  //req.params.movie_id; // Assuming you pass movie_id as a path parameter
 
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

app.get('/api/trailers/:id', async (req, res) => {
  //const movieId = req.query.movieId;
  const movieId = req.params['id'];
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: movie_api_key,
        language: 'en-US'
      }
    });
    res.json(response.data);
  }catch(error) {
    console.error(error);
    res.status(500).send('Error fetching trailers');
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: movie_api_key,
          language: 'en'
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

app.get('/api/search/:term', async (req, res) => {
  const searchTerm = req.params['term'];
  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: movie_api_key,
        query: searchTerm //req.query.term
      }
    });
    res.json(response.data);
  }catch (error){
    console.error(error);
      res.status(500).send('Error fetching movies');
  }
});


//Catch-all rewrite rule. Do this after all API calls
app.get('/movie/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/movie.html'));//../frontend/dist/movie.html
});
app.get('/search/:term', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/search.html'));
});
app.get('/reviews/:id?', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/reviews.html'));
});

//app.use("/api", movie);
app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => res.status(404).json({error: "not found"})); // * means anything else

// export our app as a module
 export default app;
