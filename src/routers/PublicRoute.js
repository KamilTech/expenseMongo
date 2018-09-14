import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to="/dashboard" />
            ) : (
                <Component {...props} />
            )
        )} />
    );
}

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

export default connect(mapStateToProps)(PublicRoute);