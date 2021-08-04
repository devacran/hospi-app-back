const Boom = require("@hapi/boom");

const notFound = (app) => {
  app.use((req, res, next) => {
    const {
      output: { statusCode, payload },
    } = Boom.notFound();
    console.log();
    res.status(statusCode).json(payload);
    next();
  });
};
module.exports = {
  notFound,
};
