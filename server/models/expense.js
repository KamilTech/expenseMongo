const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// User Model Definition
const expenseSchema = new Schema({
    createdBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    },
    whenExpense: {
        type: Date, 
        default: Date.now()
    }
}, {
    timestamps: true
});

// Export Module/Schema
module.exports = mongoose.model('Expense', expenseSchema);