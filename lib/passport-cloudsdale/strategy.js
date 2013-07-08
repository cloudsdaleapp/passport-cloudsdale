var OAuth2Strategy, Strategy,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

Strategy = (function(_super) {

  __extends(Strategy, _super);

  function Strategy(options, verify) {
    if (options == null) {
      options = {};
    }
  }

  options.authorizationURL || (options.authorizationURL = 'http://www.cloudsdale.org/oauth/authorize');

  options.tokenURL || (options.tokenURL = 'http://www.cloudsdale.org/oauth/token');

  OAuth2Strategy.call(Strategy, options, verify);

  Strategy.name = 'cloudsdale';

  return Strategy;

})(OAuth2Strategy);

({
  userProfile: function(accessToken, done) {
    var _this = this;
    return this._oauth2.get('http://api.cloudsdale.org/v2/me.json', accessToken, function(err, body, res) {
      var json, profile;
      if (err) {
        return done(err);
      } else {
        try {
          json = JSON.parse(body);
          profile = {
            provider: _this.name,
            email: json.user.email,
            display_name: json.user.display_name,
            id: json.user.username,
            avatar: json.user.avatar
          };
          return done(null, profile);
        } catch (err) {
          return done(err);
        }
      }
    });
  }
});

module.exports.Strategy = Strategy;

