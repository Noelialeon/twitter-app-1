const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const moment = require('moment');

const User = require('../models/user');
const Tweet = require('../models/tweet');

/* GET users listing. */
router.get('/new', authMiddleware('/login'), (req, res, next) => {
  const { username } = req.session.currentUser;
  res.render('new-tweet', { username });
});

router.post('/', (req, res, next) => {
  const currentUser = req.session.currentUser;
  User.findOne({ username: currentUser.username })
    .exec((err, user) => {
      if (err) { next(err); }
      const newTweet = {
        tweet: req.body.tweetText,
        user_id: user._id,
        user_name: user.username,
      };
      Tweet.create(newTweet)
        .then((doc) => {
          res.redirect('/profile');
        })
        .catch((err) => {
          res.render('new-tweetp', {
            username: user.username,
            errorMessage: err.errors.tweet.message,
          });
        });
    });
});


module.exports = router;
