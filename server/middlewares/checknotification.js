var db = require('../mobels/db')

exports.checknotification = function(req, res, next){
	db.mentors
    if (!req.session.user) {
     // req.flash('error', '未登录'); 
      return res.redirect('/login');
    }
    next();
  }