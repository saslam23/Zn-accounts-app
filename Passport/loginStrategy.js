const Strategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);


const LoginStrategy = new Strategy({passReqToCallback: true, usernameField: "email"}, function(req, email, password, done){
    User.findOne({email}, function(err,user){
        if(err) {return done(err,null);}
        if(!user) {
            return done("No user found", null)
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if(!isPasswordValid){
            return done("Email or Password not valid", null);
        }
        return done(null, user);
    })
});

module.exports = LoginStrategy;