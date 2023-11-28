const errorHandlerMid = (err, req, res, next) => {
  if (err) {
    res.redirect("/error?message=" + err.message);
    return;
  }
  next();
};

const errorToHomeMid = (err, req, res, next) => {
  if (err) {
    return res.redirect("/");
  }
  next();
};

const serverSideErrorHandler = async (err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
  next();
};

export { errorHandlerMid, errorToHomeMid, serverSideErrorHandler };
