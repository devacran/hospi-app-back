const Boom = require("@hapi/boom");

const reqValidator = (schema, check = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[check]);
    if (error) {
      next(Boom.badRequest(error));
    } else {
      next();
    }
  };
};

module.exports = {
  reqValidator,
};
