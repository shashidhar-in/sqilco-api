const jwt = require('jsonwebtoken');



// Ensure cookie-parser is used before ensureAuthenticated middleware
const ensureAuthenticated = (req, res, next) => {
    const token = req.cookies.jwtToken;
    
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token is not valid, or it's expired" });
    }
};

module.exports = {
    ensureAuthenticated
};
