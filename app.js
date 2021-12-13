// var createError = require('http-errors');
var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var studentRouter = require("./routes/student_router");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/student", studentRouter);




module.exports = app;
