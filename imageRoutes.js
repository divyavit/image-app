let express = require('express');
let imageController = require('./controllers');
let upload = require('./multerConfig');
let mongoose = require('mongoose');
let imageModel = require('./models');
let router = express.Router();
router.post('/addImage', upload.any(), imageController.createApp);

router.get('/getLatest', async (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 0;
    console.log("page no",page);
    let images = await imageModel.find().skip(page * 10).limit(10).sort({ _id: -1 });
    console.log("image db",images);
    res.json(images);
});

router.post('/comment/:id', async (req, res) => {
    let image_id = req.params.id;
    let image = await imageModel.findOne({_id:mongoose.Types.ObjectId(image_id)});
    let comments = image.comments;
    comments.push(req.body.comment);
    await image.updateOne({$set:{comments:comments}});
    let update_image = await imageModel.findOne({_id:mongoose.Types.ObjectId(image_id)});
    res.json(update_image);
});
module.exports = router