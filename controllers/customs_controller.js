constdb=require('../common/models');

exports.profile = (req, res)=>{
  res.render("./profile/home")
};
exports.profile = function(req, res) {
  db.Custom.findOne ({
    where: {
      UserId: req.user.id
    }
  }).then(function(dbCustom) {
    console.log(dbCustom);
    res.render('customs/customs', {
      layout: 'main-customs',
      custom: dbCustom
    });
  });
};

exports.createProfile = function(req, res) {

  console.log(req.user);
  // Add id from User onto req.body
  req.body.UserId = req.user.id;

  db.Custom.create(req.body).then(function(dbPost) {
    res.json(dbPost);
  });
};

