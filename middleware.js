const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");




//for login verfification and redirect to original URL
module.exports.isLogged = (req,res,next)=>{ //to check if the user is logged before adding,updating or deleting
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; //to be able to return to the orignial page after login
        req.flash("error", "You are not logged in!");
        return res.redirect("/login");
    }
    next();
}

//to save url in locals to  be sent to ejs templates
module.exports.saveRedirectUrl = (req,res,next)=>{

    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();


};

//for owner of listing authoriztion
module.exports.isOwner = async(req,res,next) => {

    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();

}


//joi serverside validation 
const validateListing = (req, res, next) => { 
    let { error } = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

//joi server validation
const validateReview = (req, res, next) => { 
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

//to authorize only the author of review to delete
module.exports.isReviewAuthor = async(req, res, next) => {

    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(review.author != res.locals.currUser._id){
        req.flash("error","You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    };

    next();

};