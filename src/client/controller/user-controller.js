const login = (req, res, next) => {
  res.render("login");
};

const signup = (req, res, next) => {
  res.render("signup");
};

const admin = (req, res, next) => {
  res.render("admin", {
    authenticated: req.isAuthenticated(),
  });
};

export default {
  login,
  signup,
  admin,
};
