import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minCharac = 6;
    this.setState({
      [name]: value,
    }, () => {
      this.setState((prevState) => ({
        isButtonDisabled:
        prevState.password.length >= minCharac
        && this.validateEmail(prevState.email) === true
          ? !prevState : prevState,
      }));
    });
  }

  validateEmail(inputText) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    }
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    const { logInDispatch } = this.props;
    return (
      <div>
        <input
          value={ email }
          name="email"
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          value={ password }
          name="password"
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ () => logInDispatch(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInDispatch: (email) => dispatch(login(email)) });

Login.propTypes = {
  logInDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
