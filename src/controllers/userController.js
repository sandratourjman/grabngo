const userQueries = require("../db/queries.users.js");
const listQueries = require("../db/queries.lists.js");
const itemQueries = require("../db/queries.items.js");
const passport = require("passport");

module.exports = {
	signUp(req, res, next){
    	res.render("users/sign_up");
  	},

	create(req, res, next){
    let newUser = {
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
     if(err){
       req.flash("error", err.errors[0].message);
       res.redirect("/users/sign_up");
     } else {
       passport.authenticate("local")(req, res, () => {
         req.flash("notice", `You've successfully signed up. Welcome ${req.user.email}!`);
         res.redirect("/lists");
       })
     }
    });
  },

 signInForm(req, res, next){
     res.render("users/sign_in");
  },

  signIn(req, res, next){
   passport.authenticate("local")(req, res, function () {
     if(!req.user){
       req.flash("notice", "Sign in failed. Please try again.")
       res.redirect("/users/sign_in");
     } else {
       req.flash("notice", `Welcome back, ${req.user.email}!`);
       res.redirect("/lists");
     }
   })
  },

  signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },


}