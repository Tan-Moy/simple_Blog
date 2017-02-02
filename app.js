//Initialize
var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Schema + model
var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title: "Test Blog",
//     image: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FaZlqiAT.png&f=1",
//     body: "Hello There!!"
// });

//RESTful Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("error");
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render('new');
});

app.post('/blogs', function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

app.put("/blogs/:id", function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});






//Server
app.listen(8000, function() {
    console.log("serving...");
});
