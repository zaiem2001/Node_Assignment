const notFound = (req, res, next) => {
  // if anyone specifies any other route than it gives error
  const error = new Error(`Not found --> ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // this middleware catches any error and sends it as a json as a response
  // we just have to do --> Throw new Error() where we want to send the error in json

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };
