import express from 'express';
import MovieCtrl from './movies.controller';

const router = express.Router();

router.route("/movie/:id").get(MovieCtrl.apiGetMovie);
/*router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")  // : means variable called id
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview); // multiple requests for this route
*/
export default router;