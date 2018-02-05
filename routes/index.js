const express = require('express');
const moment = require('moment');
const router = express.Router();

const User = require('../models/user');
const Tweet = require('../models/tweet');

const authMiddleware = require('../middlewares/auth');
const privacyMiddleware = require('../middlewares/privacy');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', authMiddleware('/login'), (req, res, next) => {
  const { _id, username, privacy } = req.session.currentUser;
  Tweet.find({ user_id: _id })
    .populate('user_id')
    .exec((err, tweets) => {
      if (err) {
        next(err);
      } else {
        res.render('profile', { username, tweets, moment, err });
      }
    });
});


router.get('/profile/:username', privacyMiddleware('/profile'), (req, res, next) => {
  User
    .findOne({ username: req.params.username }, '_id username')
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      const isFollowing = req.session.currentUser.following.indexOf(user._id.toString()) > -1;
      Tweet.find({ user_name: user.username }, 'tweet created_at')
        .sort({ created_at: -1 })
        .exec((err, tweets) => {
          res.render('otherProfile', {
            username: req.params.username,
            tweets,
            moment,
            session: req.session.currentUser,
            button_text: isFollowing ? 'Unfollow' : 'Follow',
          });
        });
    });
});

router.post('/profile/:username/follow', authMiddleware('/login'), (req, res, next) => {
  User
    .findOne({ username: req.params.username }, '_id')
    .exec((err, follow) => {
      if (err) {
        res.redirect(`/profile/${req.params.username}`);
        return;
      }

      User
        .findOne({ username: req.session.currentUser.username })
        .exec((err, currentUser) => {
          if (err) {
            next(err);
          } else {
            const followingIndex = currentUser.following.indexOf(follow._id);
            if (followingIndex > -1) {
              currentUser.following.splice(followingIndex, 1);
            } else {
              currentUser.following.push(follow._id);
            }
            currentUser.save((err) => {
              req.session.currentUser = currentUser;
              res.redirect(`/profile/${req.params.username}`);
            });
          }
        });
    });
});

router.get('/profile/:username/timeline', (req, res, next) => {
  const { currentUser } = req.session;
  currentUser.following.push(currentUser._id);
  console.log(currentUser);
  Tweet.find({ user_id: { $in: currentUser.following } })
    .sort({ created_at: -1 })
    .exec((err, timeline) => {
      if (err) {
        next(err);
      } else {
        res.render('timeline', {
          username: currentUser.username,
          timeline,
          moment,
        });
      }
    });
});


module.exports = router;
