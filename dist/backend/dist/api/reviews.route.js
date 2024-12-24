"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_js_1 = __importDefault(require("./reviews.controller.js"));
const router = express_1.default.Router();
//router.route("/").get((req, res) => res.send("hello world"));
router.route("/movie/:id").get(reviews_controller_js_1.default.apiGetReviews);
router.route("/new").post(reviews_controller_js_1.default.apiPostReview);
router.route("/:id") // : means variable called id
    .get(reviews_controller_js_1.default.apiGetReview)
    .put(reviews_controller_js_1.default.apiUpdateReview)
    .delete(reviews_controller_js_1.default.apiDeleteReview); // multiple requests for this route
exports.default = router;
