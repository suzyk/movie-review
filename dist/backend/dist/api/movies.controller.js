"use strict";
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
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const movie_api_key = process.env['API_KEY'];
class MoviesController {
    static apiGetMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // The order of these routes is important. 
            //Put the /api/movie/:id route before the /movie/:id route 
            //so that the API request is matched first.
            //app.get('/api/movie/:id', async(req, res) => {
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
            //});
        });
    }
}
exports.default = MoviesController;
