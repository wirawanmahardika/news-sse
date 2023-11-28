const errorView = (req, res, next) => {
  res.render("error", {
    error: req.query.message || "Terjadi kesalahan",
  });
};

const login = (req, res, next) => {
  res.render("login");
};

const signup = (req, res, next) => {
  res.render("signup");
};

export default {
  login,
  signup,
  errorView,
};
