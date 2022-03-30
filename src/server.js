import express from "express";
import bodyParder from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config();

let app = express();

app.use(bodyParder.json());
app.use(bodyParder.urlencoded({ extended: true }));


viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 9096;
app.listen(port, () => {
    console.log("Back end nodejs is running on: " + port);
});
