const User = require("../models/user.js");

module.exports.renderSignUp = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{

    try{ //to catch error and display flash
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password); 
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Globetrotter!");
        res.redirect("/listings");
    })
   
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    //.register is a static function here, that takes a new user insatance and a password as input
    //salt added to username and password(helloworld) stored in the form of hash using hashing function(inbuilt)
};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome Back to Globetrotter.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You have been logged out!");
        res.redirect("/listings");
    })
};
