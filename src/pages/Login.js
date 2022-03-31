import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      entrayButton: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleEntryButton = this.handleEntryButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleEntryButton());
  }

  handleEntryButton() {
    const { email, password } = this.state;

    let disabledEntryButton = false;
    const enableButtonCondition = 6;

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    && password.length >= enableButtonCondition) disabledEntryButton = true;

    this.setState({
      entrayButton: disabledEntryButton,
    });
  }

  handleClick() {
    const { email } = this.state;
    const { sendData, history } = this.props;

    const data = email;
    sendData(data);

    history.push('/carteira');
  }

  render() {
    const { entrayButton } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleInput }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleInput }
          />
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ !entrayButton }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(saveEmail(data)),
});

Login.propTypes = {
  sendData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
