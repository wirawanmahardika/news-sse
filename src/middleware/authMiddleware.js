import AuthenticationError from "../error/AuthenticationError.js";

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  // next("Anda tidak memiliki izin");
  throw new AuthenticationError("Anda tidak memiliki izin", 401);
};

const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
    return;
  }

  // next("Anda sudah login");
  throw new AuthenticationError("Anda sudah login", 403);
};

export { isAuthenticated, ensureAuthenticated };
