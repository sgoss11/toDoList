//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//GLOBAL variable
let items = ["Get Food", "Cook Food"];

app.get("/", function(req,res) {

  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, newListItems: items});
});


app.post("/", function(req, res){
  let item = req.body.newItem;

  items.push(item);
  //redirect back to homepage
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
})
