const Question = require("../models/Question.js")
const Icebreaker = require("../models/Icebreaker.js")
const IcebreakerResponse = require("../models/IcebreakerResponse.js")

IcebreakerResponseController = {}

IcebreakerResponseController.Edit = async function(req, resp){
  const icebreakerResponse = await IcebreakerResponse.FindBySecret(req.query.secret)
  const question = await Question.Find(icebreakerResponse.questionID)
  const icebreaker = await Icebreaker.Find(icebreakerResponse.icebreakerID)

  resp.render("responses/edit", {icebreakerResponse, question, icebreaker})
}

IcebreakerResponseController.Update = async function(req, resp){
  const icebreakerResponse = await IcebreakerResponse.FindBySecret(req.query.secret)
  icebreakerResponse.updateResponseText(req.body.responseText)
  const icebreaker = await Icebreaker.Find(icebreakerResponse.icebreakerID)

  resp.redirect(`/responses?secret=${icebreaker.secret}`)
}

IcebreakerResponseController.Show = async function (req, res, next) {
  const iceBreaker = await Icebreaker.FindBySecret(req.query.secret);
  const iceBreakerResponses = await IcebreakerResponse.FindAllByIcebreakerID(iceBreaker.id);
  const question = await Question.Find(iceBreaker.questionID);

  res.render('responses/show', {
    iceBreaker: iceBreaker,
    question: question,
    iceBreakerResponses: iceBreakerResponses
  });
};

module.exports = IcebreakerResponseController