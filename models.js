let mongoose = require('mongoose');
let imageUpload = mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    cloudImage: [{
        type: String,
        required: true
    }],
    imageId: [{
        type: String
    }],
    post_date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: String
    }],
});
module.exports = mongoose.model('imageUpload', imageUpload)