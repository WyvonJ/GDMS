
module.exports = function (app) {
  
  //app.use('/student', require('./student'));
  app.use('/teacher', require('./teacher'))
  app.use('/student', require('./student'))
  app.use('/admin',require('./admin'))
  app.use('/', require('./login'))

  
}
