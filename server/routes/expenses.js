const User = require('../models/user');
const Expense = require('../models/expense');
const getToken = require('../middleware/getToken');

module.exports = (router) => {
    router.post('/expense', getToken, (req, res) => { 
        if (!req.body.description) {
            res.json({ success: false, message: 'Description of expense is required.' });
        } else {
            if (!req.body.amount) {
                res.json({ success: false, message: 'Amount of expense is required.' });
            } else {
                User.findOne({ _id: req.decoded.userId }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Unable to authenticate user.' });
                        } else {
                            const { description, note, amount, whenExpense } = req.body;
                            const expense = new Expense({ description, note, amount, createdBy: user._id, whenExpense: new Date(whenExpense).toISOString() });
    
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
                                    res.json({ success: true, message: 'Expense saved!', expense: expense });
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    router.get('/expense', getToken, (req, res) => {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' })
                } else {
                    Expense.find({ createdBy: user._id }, (err, expenses) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            if (!expenses) {
                                res.json({ success: false, message: 'expenses not found.' });
                            } else {
                                res.json({ success: true, expenses: expenses });
                            }
                        }
                    });
                }
            }
        });
    });

    router.put('/expense', getToken, (req, res) => { 
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' })
                } else {
                    Expense.findById(req.body.id, (err, expense) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            if (!expense) {
                                res.json({ success: false, message: 'expenses not found.' });
                            } else {
                                const { description, note, amount, whenExpense } = req.body;
                                expense.set({ description, note, amount, whenExpense });
                                expense.save((err, updatedExpense) => {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    } else {
                                        res.json({ success: true, message: 'Expense Updated!', expense: updatedExpense});
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });

    return router;
}

