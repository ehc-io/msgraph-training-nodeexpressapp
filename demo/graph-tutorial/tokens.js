// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

module.exports = {
  getAccessToken: async function(req) {
    // console.log(`here's the req.user.oauthToken`);
    // console.log(req.user.oauthToken);
    if (req.user) {
      // Get the stored token
      var storedToken = req.user.oauthToken;
      if (storedToken) {
        if (storedToken.expired()) {
          // refresh token
          var newToken = await storedToken.refresh();
          // Update stored token
          req.user.oauthToken = newToken;
          return newToken.token.access_token;
        }

        // Token still valid, just return it
        return storedToken.token.access_token;
      }
    }
  }
};