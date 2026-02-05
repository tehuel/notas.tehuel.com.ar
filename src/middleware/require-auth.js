// Authentication middleware
export default (req, res, next) => {
  const user = req.signedCookies.github_username;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Attach user to request for later use
  req.user = user;

  next();
};