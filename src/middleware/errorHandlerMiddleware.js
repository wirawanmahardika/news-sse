import { logger } from "../app/logger.js";
import AuthenticationError from "../error/AuthenticationError.js";
import ValidationError from "../error/ValidationError.js";

const errorHandlerMid = (err, req, res, next) => {
  logger.error(err)
  if (err) return res.redirect("/error?message=" + err.message);
  next();
};

const errorToHomeMid = (err, req, res, next) => {
  logger.error(err)
  if (err) return res.redirect("/");
  next();
};

const serverSideErrorHandler = async (err, req, res, next) => {
  logger.error(err)


  if (err instanceof ValidationError) {
    return res.status(400).send(err.message)
  } else if (err instanceof AuthenticationError) {
    return res.status(401).send(err.message)
  }

  if (err) return res.status(500).send("Something went wrong")
  next();
};

export { errorHandlerMid, errorToHomeMid, serverSideErrorHandler };
