const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  // Determine status code. Default to 500 Internal Server Error if not set.
  const statusCode = err.statusCode || 500;

  // Determine error message. Use a generic message for 500 errors if no specific message is provided.
  const message = err.message || 'Internal Server Error';
  
  // Respond with JSON format
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    // Optionally include stack trace in development environment for debugging
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;