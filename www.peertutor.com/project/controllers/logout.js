const express = require('express');
const Redirect = require('../middlewares/redirect');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', Redirect.ifNotLoggedIn('/'), this.index);
      
    router.post('/', this.logout);
    return router;
  },
  index(req, res){
    res.redirect('/');
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
};
