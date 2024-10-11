const express = require("express");
const router = express.Router({mergeParams:true}); //in order to solve conflicting params issue between parent and child address
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");// *enter proper address.
const Review = require("../models/review.js");
const {isLogged, isReviewAuthor} = require("../middleware.js");
const {validateReview} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


// Review route-post
router.post("/", 
    isLogged,
    //validateReview, 
    wrapAsync(reviewController.addReview));


//Destroy route for review
router.delete("/:reviewsId",
    //isLogged ,
    //isReviewAuthor,
    wrapAsync(reviewController.destroyRoute));

module.exports = router;

//research $pull(used to pull and remove the instance of the value from the object)