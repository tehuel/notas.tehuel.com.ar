// Error handling middleware
export default (err, req, res, _next) => {
  console.error('Unhandled error:', err);

  res.status(500).json({ error: 'Internal Server Error' });
};
