let cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'dawbaj9ed',
api_key: '368812562435262',
api_secret: 'HTP5DIYZyJlb0Um3zcJh_xkP2wk'
});
exports.uploads = (file) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({url: result.url, id: result.public_id})
            console.log("result of cloudniary config",result.url,result.public_id);
        }, {resource_type: "auto"})
    });
}