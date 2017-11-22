const IcebreakersController = {}
const Question = require("../models/Question.js")

IcebreakersController.New = async function(req, resp){
  const questionID = req.query.questionID;
  
  const question = await Question.Find(questionID)
  

  resp.render('icebreakers/new', {question: question})
}

IcebreakersController.Create = async function(req, resp){
  const questionID = req.query.questionID;
  
  const question = await Question.Find(questionID)
  
  // {
  // iceBreakerEmails: [
  // "avi@flombaum.com",
  // "adele@flombaum.com",
  // "grace@flombaum.com",
  // "jerry@flombaum.com"
  // ]
  // }

  resp.send(JSON.stringify(req.body))
}


module.exports = IcebreakersController