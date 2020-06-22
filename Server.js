let http = require('http');
let app = require('./app');
let port = process.env.PORT || 4000;
let server = http.createServer(app);
server.listen(port,() => {
    console.log(`Server running on ${port}`);
});