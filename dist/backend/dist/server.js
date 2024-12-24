"use strict";
// Express : fast and light framework for node.js
// easy to make our http entry-points for our server
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const reviews_route_1 = __importDefault(require("./api/reviews.route"));
//import movie from "./api/movies.route.ts";
const path_1 = __importDefault(require("path")); //which allows you to use path.join()
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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
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
app.use(express_1.default.json());
// Serve the files from Vite's build output
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
console.log('Static file path:', path_1.default.join(__dirname, '../../frontend/dist'));
/*
app.get('/', (req, res) => {
  res.send('API is working!');
});*/
// The order of these routes is important. 
//Put the /api/movie/:id route before the /movie/:id route 
//so that the API request is matched first.
app.get('/api/movie/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const movieId = req.query.movieId;
    const movieId = req.params['id'];
    if (!movieId) {
        return res.status(400).send('Movie ID is required');
    }
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: movie_api_key,
                language: 'en-US'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movie detail');
    }
}));
app.get('/api/images/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching images');
    }
}));
app.get('/api/trailers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const movieId = req.query.movieId;
    const movieId = req.params['id'];
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
            params: {
                api_key: movie_api_key,
                language: 'en-US'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching trailers');
    }
}));
app.get('/api/genres', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: movie_api_key,
                language: 'en'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching genres');
    }
}));
// Endpoint to fetch movie data
app.get('/api/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                sort_by: 'popularity.desc',
                api_key: movie_api_key,
                page: 1
            }
        });
        //console.log('API Response Status:', response.status); // Log status code
        //console.log('API Response Data:', response.data); // Log the actual data returned
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
}));
app.get('/api/search/:term', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.params['term'];
    try {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: movie_api_key,
                query: searchTerm //req.query.term
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movies');
    }
}));
//Catch-all rewrite rule. Do this after all API calls
app.get('/movie/:id', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/movie.html')); //../frontend/dist/movie.html
});
app.get('/search/:term', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/search.html'));
});
app.get('/reviews/:id?', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/reviews.html'));
});
//app.use("/api", movie);
app.use("/api/v1/reviews", reviews_route_1.default);
app.use("*", (req, res) => res.status(404).json({ error: "not found" })); // * means anything else
// export our app as a module
exports.default = app;
