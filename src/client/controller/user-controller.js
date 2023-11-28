import passport from "passport";

const login = (req, res, next) => {
  res.render("login");
};

const signup = (req, res, next) => {
  res.render("signup");
};

export default {
  login,
  signup,
};
