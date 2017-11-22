const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Load Models
const Question = require("./models/Question.js")
const Icebreaker = require("./models/Icebreaker.js")
const IcebreakerResponse = require("./models/IcebreakerResponse.js")

async function Migrate(){
  await Question.CreateTable();
  await Icebreaker.CreateTable();
  await IcebreakerResponse.CreateTable();
}

Migrate();


// Load Controllers
const QuestionsController = require("./controllers/QuestionsController.js")
const IcebreakersController = require("./controllers/IcebreakersController.js")

// Routes - MVC - Model - View - Controller
app.get("/", QuestionsController.Index)
app.get("/questions/new", QuestionsController.New)
app.post("/questions", QuestionsController.Create)
app.get("/icebreakers/new", IcebreakersController.New) // REST
app.post("/icebreakers", IcebreakersController.Create)

module.exports = app










