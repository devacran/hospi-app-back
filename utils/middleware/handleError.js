const Boom = require("@hapi/boom");

const wrapError = (e, req, res, next) => {
  if (e.isBoom) {
    next(e);
  } else {
    next(Boom.boomify(e));
  }
};
const genError = (e) => {
  if (process.env.NODE_ENV === "development") {
    return { error: e.output.payload, stack: e.stack };
  } else {
    return { error: e.output.payload };
  }
};
const errorHandler = (e, req, res, next) => {
  res.status(e.output.statusCode);
  res.json(genError(e));
  //next(e);
};

const logError = (e, req, res, next) => {
  next(e);
};

module.exports = {
  errorHandler,
  logError,
  wrapError,
};
