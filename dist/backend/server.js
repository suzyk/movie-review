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
app.get('/api/search', async (req, res) => {
  console.log("inside search query: " + req.query.term);
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
