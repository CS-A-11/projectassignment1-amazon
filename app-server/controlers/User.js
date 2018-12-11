module.exports.signup=function(req,res)
{
    res.render('signup', { title: 'Amazon' });
}

module.exports.signin=function(req,res)
{
    res.render('signin', { title: 'Amazon' });
}

module.exports.Dosignin=function(req, res)
{
    var requestOptions, path, postdata;
  path = "/api/users/signin";
  postdata = {
    email: req.body.email,
    password: req.body.pass
  };
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };

  request(requestOptions, function(err, response, body) {
    if (response.statusCode === 200) {
      console.log(body);
      req.session.userId = body._id;
      req.session.userName = body.username;

      console.log("user session id assigned" + req.session.userId);
      res.redirect("/");
    }
  });
}

module.exports.Dosignup=function(req, res)
{
    var requestOptions, path, postdata;
    path = "/api/users/new";
    postdata = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.pass,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      profilePicture:req.body.profilePicture,
      userType:req.body.userType
    };
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      json: postdata
    };
  
    request(requestOptions, function(err, response, body) {
      if (response.statusCode === 200) {
        res.redirect("/login");
      }
    });
}