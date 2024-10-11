const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ //credentials for code to access cloudinary account
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_APIKEY,
    api_secret:process.env.CLOUD_APISECRET
})

const storage = new CloudinaryStorage({ //for storing in clodinary folder
    cloudinary:cloudinary,
    params:{
        folder:"globetrotter_DEV",
        allowedFormats:["png","jpeg","jpg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};