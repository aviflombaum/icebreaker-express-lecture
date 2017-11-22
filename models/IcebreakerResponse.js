const db = require("../config/db.js")
const crypto = require('crypto');

class IcebreakerResponse{

  static FindAllByIcebreakerID(icebreakerID){
    const sql = "SELECT * FROM icebreaker_responses WHERE icebreaker_id = ?"
    return new Promise(function(resolve){
      db.all(sql, icebreakerID, function(err, results){
        // console.log(err)
        // console.log(results)

        let icebreakerResponses = results.map(function(row){
          let icebreakerResponse = new IcebreakerResponse()
          icebreakerResponse.questionID = row.question_id
          icebreakerResponse.icebreakerID = row.icebreaker_id
          icebreakerResponse.email = row.email
          icebreakerResponse.secret = row.secret
          icebreakerResponse.id = row.id
          icebreakerResponse.responseContent = row.response_content
          
          return icebreakerResponse
        })
        
        resolve(icebreakerResponses)
      })
    })
  }
  
  static FindBySecret(secret){
    const sql = "SELECT * FROM icebreaker_responses WHERE secret = ?"
    return new Promise(function(resolve){
      db.get(sql, secret, function(err, result){
        const icebreakerResponse = new IcebreakerResponse()
        icebreakerResponse.id = result.id
        icebreakerResponse.questionID = result.question_id
        icebreakerResponse.icebreakerID = result.icebreaker_id
        icebreakerResponse.email = result.email
        icebreakerResponse.secret = result.secret

        resolve(icebreakerResponse)
      })
    })    
  }
  // static Find(id){
  //   const sql = "SELECT * FROM icebreakers WHERE id = ?"
  //   return new Promise(function(resolve){
  //     db.get(sql, id, function(err, result){
  //       const icebreaker = new icebreaker()
  //       icebreaker.id = result.id
  //       icebreaker.content = result.content

  //       resolve(icebreaker)
  //     })
  //   })    
  // }

  static BatchCreateForIcebreaker(icebreaker, emails){
    // [
    // "avi@flombaum.com",
    // "adele@flombaum.com",
    // "grace@flombaum.com",
    // "jerry@flombaum.com"
    // ]

    // for each email, we need to create a row in the DB
    // that row needs the question_id from the icebreaker
    // it needs the icebreaker_id from the icebreaker
    // and it needs to generate a secret for that response for that person
    // so we can link to it.
    emails.forEach(async function(email){
      const icebreakerResponse = new IcebreakerResponse()
      icebreakerResponse.email = email
      icebreakerResponse.questionID = icebreaker.questionID
      icebreakerResponse.icebreakerID = icebreaker.id
      await icebreakerResponse.insert()
    })
  }

  static CreateTable(){
    const sql =  `CREATE TABLE IF NOT EXISTS icebreaker_responses (
      id INTEGER PRIMARY KEY,
      icebreaker_id INTEGER,
      question_id INTEGER,
      email TEXT,
      secret TEXT,
      response_content TEXT
    )`

    return new Promise(function(resolve){
      db.run(sql, function(){
        console.log("Table Created")
        resolve("Table Created")
      })
    })
  }

  insert(){
    const self = this;
    const sql = `INSERT INTO icebreaker_responses (icebreaker_id, question_id, secret, email) VALUES (?, ?, ?, ?)`
    this.secret = crypto.randomBytes(10).toString('hex');

    return new Promise(function(resolve){
      db.run(sql, self.icebreakerID, self.questionID, self.secret, self.email, function(err){
        console.log(err)
        self.id = this.lastID
        resolve(self)
      })
    })
  }

  updateResponseText(responseText){
    const self = this;
    const sql = `UPDATE icebreaker_responses SET response_content = ? WHERE id = ?`
    self.responseText = responseText

    return new Promise(function(resolve){
      db.run(sql, self.responseText, self.id, function(){
        resolve(self)
      })
    })
  }
}

module.exports = IcebreakerResponse;