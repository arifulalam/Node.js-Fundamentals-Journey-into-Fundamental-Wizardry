const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
    console.log(req.url);
});

app.get('/profile', function(req, res){
    res.send('profile screen');
});

app.listen(8000, () => {
    console.log('ExpressJS started.');
});