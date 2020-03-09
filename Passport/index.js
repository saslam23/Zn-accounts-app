const passport = require("passport");
const User = require("../models/user.model")


passport.serializeUser(function (user, done) {
    console.log("serialized");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    })
    console.log("deserialized");
})


// Here we will import all the strategies to our index file
const SignupStrategy = require("./signupStrategy");
const LoginStrategy = require("./loginStrategy");

// Then we will set the strategies up to be used by passport

passport.use("local-signup", SignupStrategy);
passport.use("local-login", LoginStrategy);

module.exports = passport;