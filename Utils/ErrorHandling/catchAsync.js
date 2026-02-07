export const catchAsync = (fn) => {
  return (req, res, next) => {
    // Run the function, and if it fails, pass error to global handler
    fn(req, res, next).catch((err) => next(err));
  };
};
