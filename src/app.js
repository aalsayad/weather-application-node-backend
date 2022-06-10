const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//defining that this is app is going to use express
const app = express();

//Seting up paths
const PUBLIC_DIR_PATH = path.join(__dirname, "../public");
const VIEWS_PATH = path.join(__dirname, "../templates/views");
const PARTIALS_PATH = path.join(__dirname, "../templates/partials");

//Setup handlebars
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

//Set up static directory to serve
app.use(express.static(PUBLIC_DIR_PATH));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahmed Alsayad",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Ahmed Alsayad",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is some helpful text",
    name: "Ahmed Alsayad",
  });
});

//weather request
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address",
    });
  }
  geocode(req.query.address, (error, { location, latitude, longtitude } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longtitude, (error, { weather_descriptions, temperature, precip } = {}) => {
      if (error)
        return res.send({
          error: error,
        });
      res.send({
        location: location,
        forecast: `It is currently ${weather_descriptions}. ${temperature} degrees with ${precip}% possibility of rain!`,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404help", {
    title: "404 Page not found",
    name: "Ahmed Alsayad",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
    name: "Ahmed Alsayad",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
