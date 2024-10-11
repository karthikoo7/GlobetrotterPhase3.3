const Listing = require("../models/listing.js");// *enter proper address.
const Review = require("../models/review.js");

module.exports.addReview = async(req,res) =>{

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added Successfully!!");

    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyRoute = async(req,res)=>{
    let { id, reviewsId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{ reviews:reviewsId }}); 
    await Review.findByIdAndDelete(reviewsId);

    res.redirect(`/listings`)
};