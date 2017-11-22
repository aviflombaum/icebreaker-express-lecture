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

  resp.redirect(`/icebreakers?secret=${icebreaker.secret}`)
}

IcebreakersController.Show = async function(req, resp){
  const icebreaker = await Icebreaker.FindBySecret(req.query.secret)
  const icebreakerResponses = await IcebreakerResponse.FindAllByIcebreakerID(icebreaker.id)

  const question = await Question.Find(icebreaker.questionID);
  const icebreakerURL = req.protocol + '://' + req.get('host') + req.originalUrl;
  const siteURL = req.protocol + '://' + req.get('host');

  resp.render('icebreakers/show', {
    iceBreaker: icebreaker,
    iceBreakerResponses: icebreakerResponses,
    question: question,
    icebreakerURL: icebreakerURL,
    siteURL: siteURL
  });

}

module.exports = IcebreakersController