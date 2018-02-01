const express = require('express');
const moment = require('moment');
const router = express.Router();

const User = require('../models/user');
const Tweet = require('../models/tweet');

const authMiddleware = require('../middlewares/auth');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', authMiddleware('/login'), (req, res, next) => {
  const { _id, username, privacy } = req.session.currentUser;
  console.log(privacy);
  Tweet.find({ user_id: _id })
    .populate('user_id')
    .exec((err, tweets) => {
      if (err) {
        next(err);
      } else {
        res.render('profile', { username, tweets, moment });
      }
    });
});

router.get('/profile/:username', (req, res, next) => {
  User
    .findOne({ username: req.params.username }, '_id username')
    .exec((err, user) => {
      if (!user) { next(err); }

      Tweet.find({ user_name: user.username }, 'tweet created_at')
        .sort({ created_at: -1 })
        .exec((err, tweets) => {
          res.render('profile', {
            username: user.username,
            tweets,
            moment,
          });
        });
    });
});

module.exports = router;
