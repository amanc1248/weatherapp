const express = require("express");
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port =process.env.PORT || 3000
//Define paths for express config
const publicDirectory = path.join(__dirname,"../public")
const viewspath = path.join(__dirname + "/../templates/views")
const partialPath = path.join(__dirname + "/../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")// this is to setup the view engine
app.set("views",viewspath) //this is for setting up the view engine manually and giving the path to it.
hbs.registerPartials(partialPath)

//setup static directory to serve.
app.use(express.static(publicDirectory))
//express.static gives the root path and 

//the root route is never going to be use. Because there is a express.static method used.

app.get("", (req, res) => {
    res.render("index",{
        title:"Weather",
        name:"Aman Chaudhary 1"
    });
  });
app.get("/help", (req, res) => {
  res.render("help",{
    title:"Help Page",
    name:"Aman Chaudhary 2"
  });
});
app.get("/about", (req, res) => {
  res.render("about",{
    title:"About",
    name:"Dipu Rai"
  });
});
app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:"Address must be provided"
    })
  }

  geocode(req.query.address, (error,  {longitude,latitude,place} = {}) => {
    if (error) {
      return res.send(error);
    }
    //destructuring the object
    forecast(longitude,latitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        forecastData,
        place
      })
    });
  })


})
app.get("/products",(req,res)=>{
  //if query is empty.
  if(!req.query.search){
    return res.send({
      error:"Search term must be provided"
    })
  }
  //if query is not empty 
  res.send({
    products:[]
  })
})
//the buttom two url are wild card url which helps us to cover big range of url
app.get("/help/*",(req,res)=>{
  res.render("helperror",{
    title:"404",
    name:"Aman",
    errorMessage:"Help article not found"
  })
})
app.get("*",(req,res)=>{
  res.render("helperror",{
    title:"404",
    name:"Aman chaudhary",
    errorMessage:"Page not found"
  })
})
app.listen(port, () => {
  console.log("Server started at port "+ port);
})
