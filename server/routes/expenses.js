const User = require('../models/user');
const Expense = require('../models/expense');
const getToken = require('../middleware/getToken');

module.exports = (router) => {
    // Add new Expense
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
                            const expense = new Expense({
                                description,
                                note,
                                amount,
                                createdBy: user._id,
                                whenExpense: new Date(whenExpense).toISOString()
                            });

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

    // Get all Expenses
    router.get('/expense', getToken, (req, res) => {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' });
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

    // Edit expense
    router.put('/expense', getToken, (req, res) => {
        User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' });
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
                                        res.json({ success: true, message: 'Expense Updated!', expense: updatedExpense });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });

    // Delete expense
    router.delete('/expense/:id', getToken, (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' });
        } else {
            Expense.findOne({ _id: req.params.id }, (err, expense) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid id' });
                } else {
                    if (!expense) {
                        res.json({ success: false, messasge: 'expense was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user.' });
                                } else {
                                    if (user._id != expense.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to delete this expense' });
                                    } else {
                                        expense.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Expense deleted!', id: expense._id });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    return router;
}
