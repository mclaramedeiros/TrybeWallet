import React from 'react';
import { connect } from 'react-redux';
import { submitEmail } from '../actions';
// import PropTypes from 'prop-types';

class NewForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    console.log(target);
    console.log('name: ', target.name);
    console.log('value: ', target.value);
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { submit } = this.props;
    const { email } = this.state;
    submit(email);
  }

  render() {
    const { emailState } = this.props;
    // const { email } = this.state;
    return (
      <div>
        <h1>{emailState}</h1>
        <form>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              name="email"
              type="text"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Enviar

          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (email) => dispatch(submitEmail(email)),
});

const mapStateToProps = (state) => ({
  emailState: state.wallet.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);
