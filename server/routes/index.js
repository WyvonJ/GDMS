
module.exports = function (app) {
  
  //app.use('/student', require('./student'));
  app.use('/teacher', require('./teacher'))
  app.use('/student', require('./student'))
  app.use('/', require('./login'))

  
}
