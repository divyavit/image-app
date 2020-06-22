let imageModel = require('./models');
let cloud = require('./cloudinaryConfig');
exports.createApp = (req, res) => {
    try{
        let imageDetails = {
            imageName: req.body.imageName,
        }
        console.log("image name",imageDetails);
        imageModel.find({imageName: imageDetails.imageName}, (err,callback) => {
            if (err) {
                res.json({
                    err: err,
                    message: 'there was a problem uploading image'
                })
            } 
            else if(callback.length >= 1 ) {
                res.json({
                message: 'file already exist'
                })
            }
            else {
                let cloudImages = [];
                let imageIds = [];
                //console.log("controller imagedetails before upload",imageDetails);
                cloud.uploads( req.files[0].path).then((result) => {
                    cloudImages.push(result.url);
                    imageIds.push(result.id);
                    console.log("cloud image array",cloudImages);
                    cloud.uploads(req.files[1].path).then((result) => {
                        cloudImages.push(result.url);
                        imageIds.push(result.id);
                        var imageDetails = {
                            imageName: req.body.imageName,
                            cloudImage: cloudImages,
                            imageId: imageIds
                        }
                        console.log("controller imagedetails after upload",imageDetails);
                        imageModel.create(imageDetails, (err, created)=> {
                            if(err){
                                res.json({
                                err: err,
                                message: 'could not upload image, try again'
                            })
                            }   
                            else {
                                res.json({
                                    created: created,
                                    message: "image uploaded successfully!!"
                                })
                            }
                        })
                    })
                })   
            }   
        });
    }
    catch(execptions){
        console.log(execptions)
    }   
}