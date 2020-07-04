module.exports = {
  authCheck: (req, res, next) => {
    if (req.isAuthenticated) {
      return next();
    }
    res.redirect('/guest');
  },
  guestCheck: (req, res, next) => {
    if (!req.isAuthenticated) {
      return next();
    }
    res.redirect('/member');
  },
  getUser: (user) => {
    if (user) {
      return {
        id: user.id,
        googleId: user.googleId,
        displayName: user.displayName,
        firstName: user.firstName,
        surname: user.secondName,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
  },
};
