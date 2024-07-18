import { logger } from "../app/logger.js";

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
  if (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
  next();
};

export { errorHandlerMid, errorToHomeMid, serverSideErrorHandler };
