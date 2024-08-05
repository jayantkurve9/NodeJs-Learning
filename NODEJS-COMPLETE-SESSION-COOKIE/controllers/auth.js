const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        docTitle: "Login",
        isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) => {
    User.findById("66a8c39c9b750df3afb2c413")
        .then((user) => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect("/");
            });
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
};
