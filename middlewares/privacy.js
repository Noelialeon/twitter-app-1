const User = require('../models/user');

module.exports = redirect => (req, res, next) => {
  const { username, privacy } = req.params.username;
  User
    .findOne({ username: req.params.username }, 'privacy username')
    .exec((err, user) => {
      if (username === req.session.currentUser.username) {
        console.log('you are visiting your own profile!');
        res.redirect(redirect);
      } else if (user.privacy) {
        console.log('La cuenta de este usuario es privada');
        const error = 'La cuenta de este usuario es privada';
        res.redirect(redirect);
      } else {
        console.log('entrando en la cuenta pública del usuario');
        next();
      }
    });
};
