let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
var cloudiRouter = require('./imageRoutes');
let app = express();
let mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017',
{
//useUnifiedTopology: true 
useNewUrlParser: true
})
mongoose.connection;
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
        return res.status(200).json({})
    }
    next();
});
app.use('/uploads', cloudiRouter);
app.use((req, res, next) => {
    const error = new Error('NOT FOUND')
    error.status = 404
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
    error: {
        message: error.message
        }
    })
})
        
module.exports = app