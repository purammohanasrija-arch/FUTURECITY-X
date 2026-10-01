export const errorHandler = (err, req, res, next) => {
  console.error('💥 [Server Error]:', err.message);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Never expose raw stack traces to client in production
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};
