const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const students = require("./routes/students");

app.use("/students", students);

app.listen(port, () => console.log("server started"))