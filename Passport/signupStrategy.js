const Strategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);


const SignupStrategy = new Strategy({passReqToCallback: true, usernameField: "email"}, function(req, email, password, done){
    User.findOne({email}, function(err,user){
        if(err) {return done(err,null);}
        if(user) {
            return done("User already exists", null)
        }
        const encryptedPass = bcrypt.hashSync(password, salt);
        const name = req.body.name;
        const newUser = new User ({
            name,
            email,
            password: encryptedPass
        });

        newUser.save((err, inserted) => {
            if(err){return done(err, null);}

            return done(null, inserted)
        });
    });
});

module.exports = SignupStrategy;