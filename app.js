// jshint esversion:6

// adding packages
const express = require("express");
const bodyParser = require("body-parser");

// initializing express
const app = express();
// using packages with express
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// accesing public files
app.use(express.static("public"));

// GLOBAL variable
let items = ["Get Food", "Cook Food"];
let workItems = [];

//                             GET METHODS
// to do daily
app.get("/", function(req,res) {

  //local variables
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  // date to string
  let day = today.toLocaleDateString("en-US", options);

  // render list EJS with parameters
  res.render("list", {listTitle: day, newListItems: items});
});

// work to do
app.get("/work", function(req, res){

  // render list EJS with parameters
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

//                            POST METHODS

app.post("/", function(req, res){

  // local variables
  let item = req.body.newItem;

  // checking for work or daily list
  if(req.body.list === "Work"){
    // add item to work to do list
    workItems.push(item);
    // redirect back to work to do list
    res.redirect("/work");
  }else{
    // add item to to do list array
    items.push(item);
    // redirect back to to do list
    res.redirect("/");
  }
});


// listening on server
app.listen(3000, function(){
  console.log("Listening on port 3000");
})
