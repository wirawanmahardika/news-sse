import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/add-news",
  failureRedirect: "/login",
  failureFlash: true,
});

export default {
  login,
};
