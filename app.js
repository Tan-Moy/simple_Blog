var express = require("express");
var app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type: Date, default: Date.now}
});








app.listen(3000,function(){
    console.log("serving...");
});