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

/* trailer videos (get only "Teaser" type?)
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/889737/videos?language=en-US' \
     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGU2ZjU3ZDIzMmQ3NjFmM2ZjYTIwNzU0ZTA1MmI3YyIsIm5iZiI6MTczMDU4MTkzNC4zNDY1MzMzLCJzdWIiOiI2NzBiOTA1NmIxNWQ5N2IxYTkzYzcyMWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.nLrMiE4LXmQifs8ezIBVvzmpX1fGWV2o9iJj3_2Hc5A' \
     --header 'accept: application/json'

     {
  "id": 889737,
  "results": [
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Extended Preview",
      "key": "aQL8D1K0W_M",
      "site": "YouTube",
      "size": 1080,
      "type": "Clip",
      "official": true,
      "published_at": "2024-10-29T14:01:43.000Z",
      "id": "6720ecdf4be15469e70e7365"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "'Joker: Folie à Deux' with filmmakers | Academy Conversations",
      "key": "Cnbp4YldOyo",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-10-10T20:00:07.000Z",
      "id": "67098c305416802281a5dc6a"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official IMAX® Interview",
      "key": "EVu1V9K6KeY",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-10-03T22:00:14.000Z",
      "id": "66ff203fe84eeb35a0f7f30b"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Lee (Harley) Quinzel",
      "key": "E3Ay2QU3ZXI",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-10-03T19:02:29.000Z",
      "id": "66ff9380f878adfed0851541"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Shared Madness - Joker Featurette",
      "key": "2_YvsFwTdBQ",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-10-01T10:13:10.000Z",
      "id": "66fcaed66329d032d8d05bc2"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Send in the clowns",
      "key": "wTLQbani47g",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-09-28T00:06:26.000Z",
      "id": "66fa640acc43cebd03f18255"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Shared Madness - Lee",
      "key": "8jUGY10R-PA",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-09-27T17:00:15.000Z",
      "id": "66fa63e0920e94200313272f"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "UK Premiere",
      "key": "b0YfWILWH5U",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-09-26T19:19:52.000Z",
      "id": "66f62714de21a6b78250946e"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Shared Madness - Arthur Fleck",
      "key": "f5mLjNHzo4g",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-24T21:00:53.000Z",
      "id": "66f504c29a31289eb5ed3734"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Folie à Deux Featurette",
      "key": "kkrh-XhNkoY",
      "site": "YouTube",
      "size": 1080,
      "type": "Featurette",
      "official": true,
      "published_at": "2024-09-21T16:01:08.000Z",
      "id": "66f108ebc237258e4c267456"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Knock knock…",
      "key": "Y6h4LahGWcI",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-09-20T22:44:38.000Z",
      "id": "66ee1dda6fd7cc7d423ae2c0"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "It’s time to finish what he started",
      "key": "ktIkoKl032w",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-09-19T18:14:53.000Z",
      "id": "66edef696fd7cc7d423adec8"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official Clip",
      "key": "ZnhfYyAiRok",
      "site": "YouTube",
      "size": 1080,
      "type": "Clip",
      "official": true,
      "published_at": "2024-09-18T18:08:52.000Z",
      "id": "66eb2543b2917eb1800be3e9"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "That's Life",
      "key": "fiqqAI0e4Nc",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": true,
      "published_at": "2024-09-18T16:00:01.000Z",
      "id": "66eb07ca5168a896e11f86fe"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Get Ready for Judgment Day.",
      "key": "V6AWayFmIoA",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-09-18T09:18:32.000Z",
      "id": "66eb07745c0519a234d3811b"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Joaquin's Joker Featurette",
      "key": "gu3OX_kdIfQ",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-17T20:30:52.000Z",
      "id": "66e9f26582ff873f7d1efa03"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official Clip",
      "key": "wTzOF4ZY2yo",
      "site": "YouTube",
      "size": 1080,
      "type": "Clip",
      "official": true,
      "published_at": "2024-09-17T17:46:18.000Z",
      "id": "66e9f2ab5168a896e11f16be"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Behind-the-Scenes Featurette | Filmed For IMAX®",
      "key": "39Kj08_Yjng",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-16T17:14:58.000Z",
      "id": "66f2a7a102208c67c88d7f33"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "“My Name is Lee” Featurette",
      "key": "UI56wR6Gd-c",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-13T20:04:41.000Z",
      "id": "66e49c5a9013fe8722243c3e"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "What The World Needs Now",
      "key": "nHXlugkUtkU",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-09T20:03:07.000Z",
      "id": "66e1c49b93adf407678f4306"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Tickets Now On Sale",
      "key": "8aDxPC9dVDQ",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-09-09T13:00:12.000Z",
      "id": "66def86fd0d074df35046735"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "The Music Within Featurette",
      "key": "uG4DoPcBAhw",
      "site": "YouTube",
      "size": 1080,
      "type": "Behind the Scenes",
      "official": true,
      "published_at": "2024-09-03T18:03:55.000Z",
      "id": "66d8eb8e94fa4388e4017953"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Who do you think they see?",
      "key": "HaFrUMO1ggM",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-08-31T01:40:35.000Z",
      "id": "66d350c8ee69855f8e0e2d24"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "New Trailer Online Now",
      "key": "2Ql3s_X7VPU",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-23T13:02:23.000Z",
      "id": "66a033566bdabd607f2e7f4d"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official Trailer Out Now",
      "key": "mffO1wnxbG4",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-23T13:00:45.000Z",
      "id": "66a0334c1ab19946e42617e1"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official Trailer",
      "key": "_OKAwz2MsJs",
      "site": "YouTube",
      "size": 2160,
      "type": "Trailer",
      "official": true,
      "published_at": "2024-07-23T13:00:29.000Z",
      "id": "669fad37773aa3d19598fcc4"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Drop it",
      "key": "AnyVZKj6Sjo",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-23T01:01:54.000Z",
      "id": "66a1d267cc12f686870a0fc1"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Knock knock",
      "key": "HWyZyN3s_Ns",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-22T21:07:02.000Z",
      "id": "66a1d24f6fe68f521472d4a7"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Something’s changed",
      "key": "bVhgRzreqFY",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-22T16:01:01.000Z",
      "id": "66a1ea0e7cd9b23f6680f1b3"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Welcome to the Joker & Harley Show",
      "key": "HKT7JlHtVng",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-07-22T13:04:19.000Z",
      "id": "66a1d277cc12f686870a0fc5"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Trailer out now",
      "key": "W2xZ41L1DRk",
      "site": "YouTube",
      "size": 1080,
      "type": "Teaser",
      "official": true,
      "published_at": "2024-04-10T00:55:11.000Z",
      "id": "661610d9244182012e0485e0"
    },
    {
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Official Teaser Trailer",
      "key": "xy8aJw1vYHo",
      "site": "YouTube",
      "size": 2160,
      "type": "Trailer",
      "official": true,
      "published_at": "2024-04-10T00:53:54.000Z",
      "id": "6615e685244182016204aa0d"
    }
  ]
}

*/


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
