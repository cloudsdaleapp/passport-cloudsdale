# Cloudsdale Passport Strategy


Configuration
----

Use the following example implementation to get started with cloudsdale's passport library

```javascript
var passport = require('passport'),
  Cloudsdale = require('passport-cloudsdale').Strategy

passport.use('cloudsdale', new Cloudsdale({
    clientID: 'YOUR_APPLICATION_ID',
    clientSecret: 'YOUR_APPLICATION_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL'
  },
  function(token, tokenSecret, profile, done){
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

Routes
----

Two routes are required for the cloudsdale passport strategy

```javascript
/* 
* This first route redirects the user to the service provider. 
*/
app.get('/auth/provider/cloudsdale', passport.authenticate('cloudsdale'));

/**
* This next route is used for the callback from the provider
* If the authentication was a sucess then reditect the user
* If it has failed bring them to the login page
**/
app.get('/auth/provider/cloudsdale/callback', 
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

Links
----
A simple example link to use this provider
```html
<a href="/auth/provider/cloudsdale">Log In with Cloudsdale!</a>
```
