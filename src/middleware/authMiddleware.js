import AuthenticationError from "../error/AuthenticationError.js";

const isAuthenticated = (req, _, next) => {
  if (req.isAuthenticated()) return next();

  throw new AuthenticationError("Anda tidak memiliki izin", 401);
};

const ensureAuthenticated = (req, _, next) => {
  if (!req.isAuthenticated()) return next();
  throw new AuthenticationError("Anda sudah login", 403);
};

export { isAuthenticated, ensureAuthenticated };
