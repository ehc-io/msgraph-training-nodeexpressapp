var express = require('express');
var tokens = require('../tokens.js');
var router = express.Router();

router.get('/',
  async function(req, res) {
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      let params = {
        active: { gettoken: true }
      };
      var accessToken;
      try {
        var storedToken = req.user.oauthToken;
        if (storedToken) {
          if (storedToken.expired()) {
            accessToken = await storedToken.refresh();
          } else {
            accessToken = storedToken;
          }
        }
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err)
        });
      }
      // params.accesstoken = JSON.stringify(accessToken);
      //res.render('gettoken', params);
      res.json(accessToken)
    }
    });

module.exports = router;