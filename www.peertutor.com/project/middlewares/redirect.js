const redirect = {};

redirect.ifLoggedIn = (route = '/dashboard') =>
  (req, res, next) => (req.user ? res.redirect(route) : next());

redirect.ifNotLoggedIn = (route = '/') =>
  (req, res, next) => (req.user ? next() : res.redirect(route));

redirect.ifNotAuthorized = (route) =>
  (req, res, next) => (req.user.email !== req.params.email ? res.redirect(route) : next());

module.exports = redirect;
