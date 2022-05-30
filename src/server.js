import express from "express";
import bodyParder from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
//import cors from "cors";
require('dotenv').config();

let app = express();
//app.use(cors({ origin: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParder.json());
app.use(bodyParder.urlencoded({ extended: true }));


viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 9096;
let host = '0.0.0.0';
app.listen(port, host, () => {
    console.log("Back end nodejs is running on: " + port);
});
