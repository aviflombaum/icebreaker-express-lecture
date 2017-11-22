const QuestionsController = {}
const Question = require("../models/Question.js")

QuestionsController.Index = async function(req, resp){
  const questions = await Question.All()

  resp.render("questions/index", {questions: questions})
}

QuestionsController.New = function(req, resp){
  resp.render("questions/new")
}

QuestionsController.Create = async function(req, resp){
  const question = new Question();
  question.content = req.body.questionContent
  await question.insert()
  

  resp.redirect("/")
}


module.exports = QuestionsController