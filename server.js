const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const KEY = process.env.api_secret_key;
app.set("api_secret_key", KEY);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, console.log("Server started on port: ", PORT));
    }).catch((err) => {
        console.log(err);
    });