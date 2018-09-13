import React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';

class RegisterPage extends React.Component {
  state = {
    success: '',
    error: '',
    errorEmail: '',
    errorUsername: '',
    errorPassword: '',
    errorConfrim: '',
    email: '',
    username: '',
    password: '',
    confirm: '',
    regExpEmail: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    regExpUsername: new RegExp(/^[a-zA-Z0-9]+$/),
    regExpPassword: new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value});
    const email = e.target.value;

    if (email.length === 0) {
        this.setState({errorEmail: 'Email field is required'});
    } else if (!this.state.regExpEmail.test(email)) {
        this.setState({errorEmail: 'Email must be valid'});
    } else {
        this.setState({errorEmail: null});
    }
  }

  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState({username: username});

    if (username.length === 0) {
        this.setState({errorUsername: 'Username field is required'});
    } else if (username.length < 3 || username.length > 15) {
        this.setState({errorUsername: 'Minimum characters: 3, Maximum characters: 15'});
    } else if (!this.state.regExpUsername.test(username)) {
        this.setState({errorUsername: 'Username must not have any special characters'});
    } else {
        this.setState({errorUsername: null});
    }
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({password: password}, () => {
        if (this.state.password !== this.state.confirm) {
            this.setState({errorConfrim: 'Password do not match'});
        } else {
            this.setState({errorConfrim: null});
        }
    });

    if (password.length === 0) {
        this.setState({errorPassword: 'Password field is required'});
    } else if (password.length < 3 || password.length > 15) {
        this.setState({errorPassword: 'Minimum characters: 8, Maximum characters: 35'});
    } else if (!this.state.regExpPassword.test(password)) {
        this.setState({errorPassword: 'Password must contain at least one capital letter, one digit and one special characters'});
    } else {
        this.setState({errorPassword: null});
    }
  }

  onConfirmChange = (e) => {
    const confirm = e.target.value;
    this.setState({confirm: confirm}, () => {
        if (confirm.length === 0) {
            this.setState({errorConfrim: 'Confirm password field is required'});
        } else if (this.state.password !== this.state.confirm) {
            this.setState({errorConfrim: 'Password do not match'});
        } else {
            this.setState({errorConfrim: null});
        }
    });
  }

  onSubmit = (e) => {
      e.preventDefault();
      this.props.register({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
            if (!res.success) {
                this.setState({error: res.message});
            } else {
                this.setState({error: null});
                this.setState({success: res.message});
                setTimeout(() => { 
                    this.props.history.replace('/');
                }, 3000);
            }
      }).catch((error) => { 
            this.setState({error: error.message});
      })
  }

  render() {
    return (
        <div className="box-layout">
            <div className="box-layout__box box-layout__box--register">
                <h1 className="box-layout__title box-layout__title--register">Register</h1>
                <form className="form form--register" onSubmit={this.onSubmit.bind(this)}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    {this.state.success && <p className="form__success">{this.state.success}</p>}
                    {this.state.errorEmail && <p className="form__error">{this.state.errorEmail}</p>}
                    <input
                        type="email"
                        value={this.state.email}
                        placeholder="E-mail"
                        className={this.state.errorEmail ? "text-input text-input--error" : "text-input"}
                        autoFocus
                        onChange={(event) => this.onEmailChange(event)}
                    />
                    {this.state.errorUsername && <p className="form__error">{this.state.errorUsername}</p>}
                    <input
                        type="text"
                        value={this.state.username}
                        className={this.state.errorUsername ? "text-input text-input--error" : "text-input"}
                        placeholder="Username"
                        onChange={(event) => this.onUsernameChange(event)}
                    />
                    {this.state.errorPassword && <p className="form__error">{this.state.errorPassword}</p>}
                    <input
                        type="password"
                        value={this.state.password}
                        className={this.state.errorPassword ? "text-input text-input--error" : "text-input"}
                        placeholder="password"
                        onChange={(event) => this.onPasswordChange(event)}
                    />
                    {this.state.errorConfrim && <p className="form__error">{this.state.errorConfrim}</p>}
                    <input
                        type="password"
                        value={this.state.confirm}
                        className={this.state.errorConfrim ? "text-input text-input--error" : "text-input"}
                        placeholder="confirm password"
                        onChange={(event) => this.onConfirmChange(event)}
                    />
                    <div>
                        <button disabled={ this.state.errorConfrim || this.state.errorPassword || this.state.errorUsername || this.state.errorEmail || !this.state.email || !this.state.username || !this.state.password || !this.state.confirm } className="button button--register">Register</button>
                        <a className="button button--register button--register--back" onClick={() => { this.props.history.push('/') }}>Back</a>
                    </div>
                </form>
            </div>
        </div>
      )
  }
};

const mapDispatchToProps = (dispatch) => ({
    register: (e) => dispatch(register(e))
});

export default connect(undefined, mapDispatchToProps)(RegisterPage);