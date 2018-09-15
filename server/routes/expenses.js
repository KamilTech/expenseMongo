const User = require('../models/user');
const Expense = require('../models/expense');
const config = require('../config/database');
const getToken = require('../middleware/getToken');

module.exports = (router) => {
    router.post('/expense', getToken, (req, res) => { 
        if (!req.body.description) {
            res.json({ success: false, message: 'Description of expense is required.' });
        } else {
            if (!req.body.amount) {
                res.json({ success: false, message: 'Amount of expense is required.' });
            } else {
                const id = '5b9abfa285222216445312f7';
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Unable to authenticate user.' });
                        } else {
                            const { description, note, amount } = req.body;
                            const expense = new Expense({ description, note, amount, createdBy: user._id });
    
                            expense.save((err) => {
                                if (err) {
                                    if (err.errors) {
                                        if (err.errors.description) { 
                                            res.json({ success: false, message: err.errors.description.message });
                                        } else {
                                            if (err.errors.amount) {
                                                res.json({ success: false, message: err.errors.amount.message });
                                            } else {
                                                if (err.errors.note) {
                                                    res.json({ success: false, message: err.errors.note.message });
                                                }
                                            }
                                        }
                                    } else {
                                        res.json({ success: false, message: err });
                                    }
                                } else {
                                    res.json({ success: true, message: 'Expense saved!' });
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    return router;
}

