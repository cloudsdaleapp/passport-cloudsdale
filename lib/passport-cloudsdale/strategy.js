var util = require('util'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

function Strategy(options, verify) {
    if(options == null) {
        options = {};
    }

    options.authorizationURL || (options.authorizationURL = 'http://www.cloudsdale.org/oauth/authorize');
    options.tokenURL || (options.tokenURL = 'http://www.cloudsdale.org/oauth/token');
    OAuth2Strategy.call(this, options, verify);
    this.name = 'cloudsdale';
    this._userProfileURL = options.userProfileURL || 'http://api.cloudsdale.org/v2/me.json';
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
    var _this = this;
    this._oauth2.get(this._userProfileURL, accessToken, function(err, body, res) {
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
                done(null, profile);
            } catch (_error) {
                err = _error;
                done(err);
            }
        }
    });
};

module.exports.Strategy = Strategy;
