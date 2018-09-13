import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import ExpenseCreatePage from '../components/ExpenseCreatePage';
import ExpenseEditPage from '../components/ExpenseEditPage';
import NotFoundPage from '../components/NotFoundPage';
import ExpenseHelpPage from '../components/ExpenseHelpPage';
import LoginPage from '../components/LoginPage'; 
import RegisterPage from '../components/RegisterPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PublicRoute path="/register" component={RegisterPage} /> 
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={ExpenseCreatePage} />
                <PrivateRoute path="/edit/:id" component={ExpenseEditPage} />
                <Route path="/help" component={ExpenseHelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;