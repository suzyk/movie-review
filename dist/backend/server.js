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
app.use(function(req, res, next) {  // http://127.0.0.1:5500 
  res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());


// Serve static files from the "dist" directory
//app.use(express.static('dist'));

app.get('/api/movie_detail/:id', async(req, res) => {
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
