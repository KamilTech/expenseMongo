const jwt = require('jsonwebtoken');

module.exports = function getToken(req, res, next) {
    const token = req.headers['authorization']; // Create token found in headers

    if (!token) {
      res.json({ success: false, message: 'No token provided' });
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
}