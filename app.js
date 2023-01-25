const express = require('express');
const bodyParser = require('body-parser');

const UserRoutes = require('./routes/user.route');

const app = express();

// require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Token oluştururken kullanılacak global değişken secretKey'i koda dahil ederiz
app.set("api_secret_key", process.env.api_secret_key);

// app.set("api_secret_key", require("./config").api_secret_key);

/* This is the root route. It is used to check if the server is running. */
app.get("/", (req, res) => {
    res.status(200).json({ alive: "True" });
  });

/* Telling the server to use the routes in the UserRoutes file. */
app.use("/", UserRoutes);

module.exports = app;