const QuestionsController = {}
const Question = require("../models/Question.js")

QuestionsController.Index = async function(res, resp){
  const questions = await Question.All()
  console.log(questions)
  resp.render("questions/index", {questions: questions})
}

QuestionsController.New = function(res, resp){
  resp.render("questions/new")
}

QuestionsController.Create = async function(req, resp){
  const question = new Question();
  question.content = req.body.questionContent
  await question.insert()
  

  resp.redirect("/")
}


module.exports = QuestionsController