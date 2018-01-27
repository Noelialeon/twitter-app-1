const express = require('express');
const router = express.Router();

const User = require('../models/user');

const authMiddleware = require('../middlewares/auth');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', authMiddleware('/login'), (req, res, next) => {
  const userId = req.session.currentUser;

  User.findById(userId)
    .then((user) => {
      res.render('profile', { username: user.username });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
