const User = require("../models/User");

exports.getGetUsers = (req, res) => {
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.postCreateUser = (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((newUser) => {
    req.session.isLoggedIn = true;
    req.session.userId = newUser.id;
    req.session.save();
    res.json({ id: newUser.id });
  });
};

exports.getIsLoggedIn = (req, res) => {
  console.log(req.session.isLoggedIn);
  res.json({ isLoggedIn: req.session.isLoggedIn || false });
};

exports.postLogIn = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findAll({ where: { username: username, password: password } }).then(
    (users) => {
      if (users.length > 0) {
        req.session.isLoggedIn = true;
        req.session.userId = users[0].id;
        req.session.save();
        res.json({ validCredentials: true });
      } else {
        res.send({ validCredentials: false });
      }
    }
  );
};

exports.postLogOut = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.isLoggedIn = false;
    req.session.save();
    res.send();
  }
};
