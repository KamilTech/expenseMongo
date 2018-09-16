import database from '../firebase/firebase';
import headers from './headers';
import axios from 'axios';

const domain = "http://localhost:3000/"; // Development Domain

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, whenExpense: createdAt };

        return axios.post(`${domain}expenses/expense`, expense,  {"headers": headers()})
                .then(res => {
                    if (res.data.success === true) {
                        dispatch(addExpense(res.data.expense));
                        return res.data.message;
                    } else {
                        return res.data.message;
                    }
                }).catch((error) => { 
                    throw new Error(error);
                });
    };
};

// EDIT_EXPENSE
export const editExpense = (updates) => ({
    type: 'EDIT_EXPENSE',
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        const expense = {
            id,
            ...updates
        };
        return axios.put(`${domain}expenses/expense`, expense,  {"headers": headers()})
                .then(res => {
                    if (res.data.success === true) {
                        dispatch(editExpense(res.data.expense));
                    }
                }).catch((error) => { 
                    throw new Error(error);
                });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    };
};

// SET_EXPENSE
export const setExpense = (expenses) => ({
    type: 'SET_EXPENSE',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return axios.get(`${domain}expenses/expense`, {"headers": headers()})
                .then(res => {
                    if (res.data.success === true) {
                        dispatch(setExpense(res.data.expenses));
                    }
                }).catch((error) => { 
                    throw new Error(`Can't get data`);
                })
    };
};