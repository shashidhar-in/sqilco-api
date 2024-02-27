const jwt = require('jsonwebtoken');

function setCookie(res, name, value, options = {}) {
  res.cookie(name, value, options);
}

function clearCookie(res, name) {
  res.clearCookie(name);
}

function verifyTokenFromCookie(req, res, next) {
  // Check if token is present in cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { setCookie, clearCookie, verifyTokenFromCookie };
