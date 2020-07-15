module.exports = {
  // Check if user is authenticated. If they are not, reroute to login page
  authCheck: (req, res, next) => {
    if (req.user) {
      return next();
    }
    res.redirect('/guest');
  },
  // Check if user is not authenticated. If they are not a guest, reroute to member screen
  guestCheck: (req, res, next) => {
    if (!req.user) {
      return next();
    }
    res.redirect('/member');
  },
};
