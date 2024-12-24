import axios from 'axios';
import {Request, Response} from 'express';
import 'dotenv/config';
const movie_api_key = process.env['API_KEY'];

export default class MoviesController {

    static async apiGetMovie(req:Request, res: Response){

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
        //});
    }
}
