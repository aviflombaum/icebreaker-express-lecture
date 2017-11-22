const db = require("../config/db.js")
const crypto = require('crypto');

class Icebreaker{
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

  static Find(id){
    const sql = "SELECT * FROM icebreakers WHERE id = ?"
    return new Promise(function(resolve){
      db.get(sql, id, function(err, result){
        const icebreaker = new Icebreaker()
        icebreaker.id = result.id
        icebreaker.secret = result.secret
        icebreaker.questionID = result.question_id

        resolve(icebreaker)
      })
    })    
  }

  static FindBySecret(secret){
    const sql = "SELECT * FROM icebreakers WHERE secret = ?"
    return new Promise(function(resolve){
      db.get(sql, secret, function(err, result){
        const icebreaker = new Icebreaker()
        icebreaker.id = result.id
        icebreaker.questionID = result.question_id

        resolve(icebreaker)
      })
    })    
  }

  static CreateTable(){
    const sql =  `CREATE TABLE IF NOT EXISTS icebreakers (
      id INTEGER PRIMARY KEY,
      question_id INTEGER,
      secret TEXT
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
    const sql = `INSERT INTO icebreakers (question_id, secret) VALUES (?, ?)`
    this.secret = crypto.randomBytes(10).toString('hex');

    return new Promise(function(resolve){
      db.run(sql, self.questionID, self.secret, function(err){
        console.log(err)
        self.id = this.lastID
        resolve(self)
      })
    })
  }


}

module.exports = Icebreaker;