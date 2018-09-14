import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import jwtDecode from 'jwt-decode';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: (() => {
        if (state.auth.token) {
            const decoded = jwtDecode(state.auth.token);
            return decoded.exp < new Date().getTime();
        } else {
            return false;
        }
    })()
});

export default connect(mapStateToProps)(PrivateRoute);
