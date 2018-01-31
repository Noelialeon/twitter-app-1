const express = require('express');
const router = express.Router();

// Models
const Tweet = require('../models/tweet');

// Moment to format dates
const moment = require('moment');

router.get('/', (req, res) => {
  Tweet
    .find({}, 'user_name tweet created_at')
    .sort({ created_at: -1 })
    .exec((err, timeline) => {
      res.render('timeline/index', { timeline, moment });
    });
});

module.exports = router;
