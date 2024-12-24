"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_controller_1 = __importDefault(require("./movies.controller"));
const router = express_1.default.Router();
router.route("/movie/:id").get(movies_controller_1.default.apiGetMovie);
/*router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")  // : means variable called id
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview); // multiple requests for this route
*/
exports.default = router;
