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
Object.defineProperty(exports, "__esModule", { value: true });
//import mongodb from 'mongodb';
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
let reviews;
class ReviewsDAO {
    static injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reviews) { // means we already have database connection
                return;
            }
            try {
                reviews = yield conn.db("reviews").collection("reviews");
            }
            catch (e) {
                console.error(`Unable to establish collection handles in userDAO: ${e}`);
            }
        });
    }
    static addReview(movieId, user, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewDoc = {
                    movieId: movieId,
                    user: user,
                    review: review
                };
                return yield reviews.insertOne(reviewDoc); //insertOne is mongodb command
            }
            catch (e) {
                console.error(`Unable to post review: ${e}`);
                return { error: e };
            }
        });
    }
    static getReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield reviews.findOne({ _id: ObjectId.createFromHexString(reviewId) });
            }
            catch (e) {
                console.error(`Unable to get review: ${e}`);
                return { error: e };
            }
        });
    }
    static updateReview(reviewId, user, review) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResponse = yield reviews.updateOne({ _id: ObjectId.createFromHexString(reviewId) }, { $set: { user: user, review: review } });
                return updateResponse;
            }
            catch (e) {
                console.error(`Unable to update review: ${e}`);
                return { error: e };
            }
        });
    }
    static deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResponse = yield reviews.deleteOne({ _id: ObjectId.createFromHexString(reviewId) });
                return deleteResponse;
            }
            catch (e) {
                console.error(`Unable to delete review: ${e}`);
                return { error: e };
            }
        });
    }
    static getReviewsByMovieId(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            try { // we are converting string to integer and passing it to mongodb
                const cursor = yield reviews.find({ movieId: parseInt(movieId) });
                return cursor.toArray();
            }
            catch (e) {
                console.error(`Unable to get review: ${e}`);
                return { error: e };
            }
        });
    }
}
exports.default = ReviewsDAO;
