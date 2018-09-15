import React from 'react';
import { connect } from 'react-redux';
import { loginMongo } from '../actions/auth';

class LoginPage extends React.Component {
    state = {
        success: '',
        error: '',
        username: '',
        password: '',
        errorUsername: '',
        errorPassword: '',
        disabled: false
    }

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
        const username = e.target.value;
    
        if (username.length === 0) {
            this.setState({errorUsername: 'Username field is required'});
        } else {
            this.setState({errorUsername: ''});
        }
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
        const password = e.target.value;
    
        if (password.length === 0) {
            this.setState({errorPassword: 'Username field is required'});
        } else {
            this.setState({errorPassword: ''});
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ disabled: true });
        try {
            const response = await this.props.login({
                username: this.state.username,
                password: this.state.password
            });
            if (response.success === false) {
                this.setState({ error: response.message, disabled: false });
            } else if (response.success === true) {
                this.setState({ error: '', success: response.message });
            };
         } catch(error) {
                this.setState({error: error.message});
         }
    }
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box box-layout__box--login">
                    <h1 className="box-layout__title">Expensify App</h1>
                    <form className="form form--register" onSubmit={this.onSubmit.bind(this)}>
                        {this.state.error && <p className="form__error">{this.state.error}</p>}
                        {this.state.success && <p className="form__success">{this.state.success}</p>}
                        {this.state.errorUsername && <p className="form__error">{this.state.errorUsername}</p>}
                        <input
                            type="username"
                            value={this.state.username}
                            placeholder="Username"
                            className={this.state.errorUsername ? "text-input text-input--error" : "text-input"}
                            autoFocus
                            onChange={(event) => this.onUsernameChange(event)}
                        />
                        {this.state.errorPassword && <p className="form__error">{this.state.errorPassword}</p>}
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="password"
                            className={this.state.errorPassword ? "text-input text-input--error" : "text-input"}
                            autoFocus
                            onChange={(event) => this.onPasswordChange(event)}
                        />
                        <div>
                            <button disabled={ this.state.errorUsername || this.state.errorPassword || !this.state.username || !this.state.password || this.state.disabled } className="button button--register">Login</button>
                        </div>
                        <div className="box-layout__redirect" onClick={() => this.props.history.push('/register')}>
                            <a>Don 't have an account? Register here...</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    login: (e) => dispatch(loginMongo(e))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);