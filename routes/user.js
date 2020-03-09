const router = require("express").Router();
const passport = require("../Passport");



router.route("/signup").post((req, res, next) => {
    passport.authenticate("local-signup", function (err, user, info) {
        if (err) {
            return res.status(500).json(err);
        }

        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({ err });
            }
            user.isAuthenticated = true;


           
            return res.json({
                user:{
                    name: user.name,
                    email: user.email,
                    isAuthenticated: user.isAuthenticated
            }});
        })
    })(req, res, next);

});

router.route("/login").post((req, res, next) => {
    passport.authenticate("local-login", function (err, user, info) {
        if (err) {
            return res.status(500).json({ err });
        }


        req.login(user, function (err) {
            if (err) {
                return res.status(500).json({ err });
            }

            user.isAuthenticated = true;

            return res.json({
                user:{
                    name: user.name,
                    email: user.email,
                    isAuthenticated: user.isAuthenticated
            }});
        })

    })(req, res, next);

});


router.route("/logout").get((req, res) => {
    req.logout();
    res.json("deleted");
})


module.exports = router;