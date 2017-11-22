const db = require("../config/db.js")

class Question{
  static All(){
    const sql = "SELECT * FROM questions"
    return new Promise(function(resolve){
      db.all(sql, function(err, results){
        // console.log(err)
        // console.log(results)

        let questions = results.map(function(row){
          let q = new Question()
          q.content = row.content
          q.id = row.id
          return q
        })
        
        resolve(questions)
      })
    })
  }

  static Find(id){
    const sql = "SELECT * FROM questions WHERE id = ?"
    return new Promise(function(resolve){
      db.get(sql, id, function(err, result){
        const question = new Question()
        question.id = result.id
        question.content = result.content

        resolve(question)
      })
    })    
  }

  static CreateTable(){
    const sql =  `CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY,
      content TEXT
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
    const sql = `INSERT INTO questions (content) VALUES (?)`
    return new Promise(function(resolve){
      db.run(sql, self.content, function(){
        self.id = this.lastID
        resolve(self)
      })
    })
  }


}

module.exports = Question;