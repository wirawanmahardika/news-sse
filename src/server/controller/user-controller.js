import passport from "passport";

const login = passport.authenticate("local", {
  successRedirect: "/view/add-news",
  failureRedirect: "/view/login",
  // failureRedirect: "http://localhost:5173/view/login",
  failureFlash: true,
});

export default {
  login,
};
