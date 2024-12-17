import ReviewsDAO from '../dao/reviewsDAO.js';
// DAO is what we actually use to access database // DAO: Data Access Object

export default class ReviewsController {
    static async apiPostReview(req, res, next) { // we don't need to crate instance for static function
        try {
            const movieId = parseInt(req.body.movieId); // make sure we are sending integers
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);
            res.json({status: "success"});
        }catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReview(req, res, next) { // we don't need to crate instance for static function
        try {
            let id = req.params.id || {};
            console.log(req);
            let review = await ReviewsDAO.getReview(id);
            if (!review){
                res.status(404).json({error: "Not found"});
                return 
            }
            res.json(review);
        }catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateReview(req, res, next) { // we don't need to crate instance for static function
        try {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.updateReview(reviewId, user, review);
            var {error} = reviewResponse;
            if (error){
                res.status(400).json({error});
            }

            if (reviewResponse.modifiedCount === 0) { // nothing was changed
                throw new Error("unable to update review",);
            }

            res.json({ status: "success" });
        }catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next) { // we don't need to crate instance for static function
        try {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId );
            res.json({status: "success"});
        }catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiGetReviews(req, res, next) { // we don't need to crate instance for static function
        try {
            let id = req.params.id || {};
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews){
                res.status(404).json({error: "Not found"});
                return
            }
            res.json(reviews);
        }catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }
}

