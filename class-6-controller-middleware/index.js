const express = require("express");
const app = express();

const security = require('./middleware/security');

const profileController = require("./controllers/profileController");
const messageController = require("./controllers/messageController");
const registrationController = require("./controllers/registrationController");

app.use(express.json());

app.get('/', (req, res) => {
    console.log('API');
    res.send("NodeJS");
});

app.post('/registration', security, registrationController)

app.post('/profile', security, profileController);

app.post('/message', security, messageController);

app.listen(8000, () => {
    console.log('NodeJS Server started...');
})