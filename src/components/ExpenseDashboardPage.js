import React from 'react';
import ExpenseList from './ExpenseList';
import ExenseListFilters from './ExpenseListFilters';
import ExpenseSummary from './ExpenseSummary';

const ExpenseDashboardPage = () => (
    <div className="dashboardPage">
        <ExpenseSummary />
        <ExenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;