let multer = require('multer');
let util = require('util');
let storage = multer.diskStorage({
    destination:function(req, file,cb){
        console.log("mimetype",file.mimetype);
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, 'uploads');
        }
        else{
            cb({message: 'this file is neither a video or image file'}, false)
        }
        },
        filename: function(req, file, cb){
            cb(null, file.originalname+ '-' + Date.now());
        }
});
let upload = multer({storage:storage});
//let upload = util.promisify(uploadFilesMiddleware);
module.exports = upload;
