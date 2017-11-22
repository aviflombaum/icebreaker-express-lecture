const db = require("../config/db.js")
const crypto = require('crypto');

class IcebreakerResponse{
  // static All(){
  //   const sql = "SELECT * FROM icebreakers"
  //   return new Promise(function(resolve){
  //     db.all(sql, function(err, results){
  //       // console.log(err)
  //       // console.log(results)

  //       let icebreakers = results.map(function(row){
  //         let q = new icebreaker()
  //         q.content = row.content
  //         q.id = row.id
  //         return q
  //       })
        
  //       resolve(icebreakers)
  //     })
  //   })
  // }

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


}

module.exports = IcebreakerResponse;