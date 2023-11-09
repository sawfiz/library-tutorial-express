const mongoose = require('mongoose');

function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    next(); // The ID is valid, proceed to the next middleware or route handler.
  } else {
    const err = new Error('Invalid Object ID');
    err.status = 400; // You can set the appropriate status code.
    next(err); // Pass the error to the error-handling middleware.
  }
}

module.exports = validateObjectId;