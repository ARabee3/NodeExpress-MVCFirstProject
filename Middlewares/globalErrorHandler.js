export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    statusCode: statusCode,
    stack: process.env.MODE === "development" ? err.stack : undefined,
  });
};
