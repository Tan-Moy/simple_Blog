//Initialize
var express = require("express");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");

//Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Schema + model
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);
Blog.create({
    title: "Test Blog",
    image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FaZlqiAT.png&f=1",
    body: "Hello There!!"
});

//RESTful Routes
app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
    Blog.find({},function(err,blogs){
        if(err){
            console.log("error");
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});







//Server
app.listen(8000, function () {
    console.log("serving...");
});
