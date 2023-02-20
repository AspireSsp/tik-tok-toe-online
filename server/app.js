const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// app.use(cors());
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser());

//    route are import here..
const user = require("./routes/userRoutes");
const game = require('./routes/gameRoutes');
app.use("/api/v1", user);
app.use("/api/v1", game);


//  Middleware for Errors
// app.use(errorMiddleware);
module.exports = app;