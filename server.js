const app = require('./app.js')
const express = require('express')
const util = require('util');
const logger = require('morgan');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV === 'test'){
  app.listen(3001)
} else {
  if (process.env["LEARNING_ENVIRONMENT"]){  
    util.inspect.styles.string = 'blue';
    const colorizedTestingAddress = util.inspect(`http://${process.env.HOST_IP}:${process.env.RAILS_PORT}`, { colors: true }).replace(/['"]/g, '');

    util.inspect.styles.string = 'red';
    const setupMessageStart = util.inspect('Navigate to', { colors: true }).replace(/['"]/g, '');
    const setupMessageEnd = util.inspect('in your browser to see your application.', { colors: true }).replace(/['"]/g, '');
    const exitMessage = util.inspect('To stop the application server and return to your terminal, press Control-C.', { colors: true }).replace(/['"]/g, '');

    console.log(setupMessageStart, colorizedTestingAddress, setupMessageEnd);
    console.log(exitMessage);
  } else {
    console.log(`Visit: http://localhost:3000`)
  }
  app.listen(3000)
}

module.exports = app