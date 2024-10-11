const Listing = require("../models/listing.js");// *enter proper address.
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //geocoding, forward-coding
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{
    let allListings = await Listing.find();
    res.render("./listings/index.ejs",{ allListings }); 
};

module.exports.newForm =  (req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.postForm = async(req,res,next)=>{ 
   let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listings.location, //converts location entered in the form to coordinates for mapping
        limit: 1
      })
        .send()
        
       
        
    
    
    
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listings);
    newListing.owner = req.user._id; //to get the username fromthe user obj upon login
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry; //storing the coordinates into the model db

    let savedListing = await newListing.save();
    console.log(savedListing);
    
    req.flash("success", "Listing Added Successfully!!");
    res.redirect("/listings");

};

module.exports.showRoute = async(req,res)=>{
    let{ id } = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    })
    .populate("owner");  //used to send the whole object of reviews instead of tjust the id
    if(!listing){
        req.flash("error", " The listing you requested for, does not Exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing });

};

module.exports.editRoute = async(req,res)=>{

    let{ id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", " The listing you requested for, does not Exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150"); //for edit from image resizing
    res.render("./listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateRoute = async(req,res)=>{
   
    let{ id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listings}, //deconstructing to get separate values from the form using'...'
        //{runValidators:true, new: true} experimenting
    );
    if(typeof req.file !=="undefined"){
        let url = req.file.url;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully!!");
    res.redirect("/listings");
};

module.exports.destroyRoute = async(req,res)=>{
    let{ id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!!");
    console.log(deletedList);
    res.redirect("/listings");
};

