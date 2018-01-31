module.exports = redirect => (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect(redirect);
  } else {
    next();
  }
};

