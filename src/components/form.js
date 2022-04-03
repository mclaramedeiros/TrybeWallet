import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, sentExpenses } from '../actions/index';
// import Wallet from '../pages/Wallet';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      description: '',
      currency: 'USD',
      value: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
      isButtonDisabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // validadeBtn = () => {
  //   const { description,
  //     currency,
  //     value,
  //     tag,
  //     method,
  //     isButtonDisabled, } = this.state;

  //     this.setState({ isButtonDisabled: })
  // }

  handleClick() {
    const { expenses, sendExpenses } = this.props;

    const id = expenses.length;

    const {
      value,
      tag,
      description,
      method,
      currency } = this.state;

    const objExpenses = {
      id,
      value,
      tag,
      description,
      method,
      currency: parseInt(currency, 10),
    };
    console.log(objExpenses);
    sendExpenses(objExpenses);
  }

  handleChange({ target: { name, value } }) {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  // import {
  //   WALLET,
  //   GET_CURRENCY,
  //   REQUEST_CURRENCY,
  //   FAILED_REQUEST,
  //   SEND_OBJECT_EXPENSE,
  //   REMOVE_EXPENSE,
  // } from '../actions';

  // const WALLETS = {
  //   currencies: [],
  //   expenses: [],
  //   apiExpenses: {},
  //   error: '',
  // };

  render() {
    const { currencies, expenses } = this.props;
    const { value, description, currency, tag, method } = this.state;
    const pay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const options = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form action="">
        <h2>{expenses}</h2>
        <label htmlFor="value-input">
          {' '}
          Despesa
          <input
            type="number"
            data-testid="value-input"
            name="value"
            id="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <input
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((unit) => (
              <option
                key={ unit }
                // data-testid={ currency }
              >
                {unit}
              </option>)) }
          </select>
        </label>

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ this.handleChange }
        >
          { pay.map((payment) => (
            <option
              key={ payment }
            >
              {payment}
            </option>
          )) }
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }
        >
          { options.map((tagUnit) => (
            <option
              key={ tagUnit }

            >
              {tagUnit}
            </option>
          )) }
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchApi()),
  sendExpenses: (objExpenses) => dispatch(sentExpenses(objExpenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  // value: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
