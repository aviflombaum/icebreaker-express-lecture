const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Load Models
const Question = require("./models/Question.js")


async function Migrate(){
  await Question.CreateTable();
}

Migrate();


// Load Controllers
const QuestionsController = require("./controllers/QuestionsController.js")

// Routes
app.get("/", QuestionsController.Index)
app.get("/questions/new", QuestionsController.New)
app.post("/questions", QuestionsController.Create)

module.exports = app










