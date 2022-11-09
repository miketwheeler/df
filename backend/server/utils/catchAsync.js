
// useable catch for any async method - handles the error catching for convenience & DRY principle. 
//      --> import then wrap this around async calls
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = catchAsync;