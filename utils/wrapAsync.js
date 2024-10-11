//this is a wrapAsync function used to specifiaclly handle async function error.
//used in place of the try and catch block.

module.exports = (fn) =>{
    return (req, res, next) => {
        fn(req, res, next) .catch(next);
    }
}


/*
wrapAsync is a custom error handling function replacing try and catch block but serving the same function.
new method of getting data from ejs in the form of object instance
it is done here to deal with the error encountered when an empty post request is sent and tried to save on the db
*/