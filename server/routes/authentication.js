const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'You must provide an e-mail'
            });
        } else {
            if (!req.body.username) {
                res.json({
                    success: false,
                    message: 'You must provide a username'
                });
            } else {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        message: 'You must provide a password'
                    });
                } else {
                    const { email, username, password } = req.body;
                    let user = new User({ email, username, password });
                    // Save user to database
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({
                                    success: false,
                                    message: 'Username or e-mail already exists'
                                });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({
                                            success: false,
                                            message: err.errors.email.message
                                        });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({
                                                success: false,
                                                message: err.errors.username.message
                                            });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({
                                                    success: false,
                                                    message: err.errors.password.message
                                                });
                                            } else {
                                                res.json({
                                                    success: false,
                                                    message: err
                                                });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({
                                        success: false,
                                        message: 'Could not save user. Error: ',
                                        err
                                    });
                                }
                            }
                        } else {
                            res.json({
                                success: true,
                                message: 'Acount registered!'
                            });
                        }
                    });
                }
            }
        }
    });

    router.post('/login', (req, res) => {
        if (!req.body.username) {
          res.json({ success: false, message: 'No username was provided' });
        } else {
          if (!req.body.password) {
            res.json({ success: false, message: 'No password was provided.' });
          } else {
            User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err });
              } else {
                if (!user) {
                  res.json({ success: false, message: 'Username not found.' });
                } else {
                  const validPassword = user.comparePassword(req.body.password);
                  if (!validPassword) {
                    res.json({ success: false, message: 'Password invalid' });
                  } else {
                    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } });
                  }
                }
              }
            });
          }
        }
      });

    return router;
}