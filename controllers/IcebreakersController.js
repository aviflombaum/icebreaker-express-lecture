const IcebreakersController = {}
const Question = require("../models/Question.js")
const Icebreaker = require("../models/Icebreaker.js")
const IcebreakerResponse = require("../models/IcebreakerResponse.js")

IcebreakersController.New = async function(req, resp){
  const questionID = req.query.questionID;
  
  const question = await Question.Find(questionID)
  

  resp.render('icebreakers/new', {question: question})
}

IcebreakersController.Create = async function(req, resp){
  const questionID = req.query.questionID;
  
  const question = await Question.Find(questionID)
  
  const icebreaker = new Icebreaker()
  icebreaker.questionID = questionID
  await icebreaker.insert() // the icebreaker is in the DB

  console.log(icebreaker)

  const emails = req.body.iceBreakerEmails; // where is the data?
  await IcebreakerResponse.BatchCreateForIcebreaker(icebreaker, emails)

  // {
  // iceBreakerEmails: [
  // "avi@flombaum.com",
  // "adele@flombaum.com",
  // "grace@flombaum.com",
  // "jerry@flombaum.com"
  // ]
  // }

  resp.send(req.body)
}


module.exports = IcebreakersController