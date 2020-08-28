// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <IndexRouterSnippet>
var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');

/* GET home page. */
router.get('/', 
  async function(req, res, next) {
    let params = {
      active: { home: true }
    };
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.render('index', params);
    } else {
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err)
        });
      }

      params.accessToken = accessToken;
      res.render('index', params);
    }
    });

module.exports = router;