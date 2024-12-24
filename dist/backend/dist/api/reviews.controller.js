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
const reviewsDAO_js_1 = __importDefault(require("../dao/reviewsDAO.js"));
// DAO is what we actually use to access database // DAO: Data Access Object
class ReviewsController {
    static apiPostReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = parseInt(req.body.movieId); // make sure we are sending integers
                const review = req.body.review;
                const user = req.body.user;
                const reviewResponse = yield reviewsDAO_js_1.default.addReview(movieId, user, review);
                res.json({ status: "success" });
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        });
    }
    static apiGetReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                console.log(req);
                let review = yield reviewsDAO_js_1.default.getReview(id);
                if (!review) {
                    res.status(404).json({ error: "Not found" });
                    return;
                }
                res.json(review);
            }
            catch (e) {
                console.log(`api, ${e}`);
                res.status(500).json({ error: e });
            }
        });
    }
    static apiUpdateReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = req.params.id;
                const review = req.body.review;
                const user = req.body.user;
                const reviewResponse = yield reviewsDAO_js_1.default.updateReview(reviewId, user, review);
                var { error } = reviewResponse;
                if (error) {
                    res.status(400).json({ error });
                }
                if (reviewResponse.modifiedCount === 0) { // nothing was changed
                    throw new Error("unable to update review");
                }
                res.json({ status: "success" });
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        });
    }
    static apiDeleteReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = req.params.id;
                const reviewResponse = yield reviewsDAO_js_1.default.deleteReview(reviewId);
                res.json({ status: "success" });
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        });
    }
    static apiGetReviews(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                let reviews = yield reviewsDAO_js_1.default.getReviewsByMovieId(id);
                if (!reviews) {
                    res.status(404).json({ error: "Not found" });
                    return;
                }
                res.json(reviews);
            }
            catch (e) {
                console.log(`api, ${e}`);
                res.status(500).json({ error: e });
            }
        });
    }
}
exports.default = ReviewsController;
