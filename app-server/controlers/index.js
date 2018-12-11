module.exports.index=function(req,res)
{
    res.render('home', { title: 'Amazon' });
}

module.exports.about=function(req,res)
{
    res.render('about', { title: 'Amazon' });
}

module.exports.checkLogin = function requiresLogin(req, res, next) {
    //
    if (req.session && req.session.userId) {
      console.log("session active");
      next();
    } else {
      console.log("no session active");
      var err = new Error("You must be logged in to view this page.");
      err.status = 401;
      res.redirect("/login");
    }
  };