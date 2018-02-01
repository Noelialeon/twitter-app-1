const User = require('../models/user');

module.exports = redirect => (req, res, next) => {
  const { username, privacy } = req.params.username;
  User
    .findOne({ username: req.params.username }, 'privacy username')
    .exec((err, user) => {
      if (user.privacy) {
        const error = 'La cuenta de este usuario es privada';
        res.redirect('/profile');
      } else {
        next();
      }
    });
};

