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
      moeda: 'USD',
      value: 0,
      tag: 'Alimentação',
      method: 'Dinheiro',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { expencies, currencies } = this.props;

    const id = currencies.length;

    const {
      value,
      tag,
      description,
      method,
      moeda } = this.state;

    const objExpences = {
      id,
      value,
      tag,
      description,
      method,
      moeda,
    };

    console.log(id,
      value,
      tag,
      description,
      method,
      moeda);
    expencies(objExpences);
    return objExpences;
  }

  //   handleChange({ target: { name, value } }) {
  //     this.setState({
  //       [name]: value,
  //     });
  //   }

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
    const { value, currencies } = this.props;
    const pay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="despesa">
          {' '}
          Despesa
          <input
            type="text"
            data-testid="value-input"
            name="despesa"
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          <input
            name="descrição"
            data-testid="description-input"
            value={ value }
          />
        </label>
        <label htmlFor="currencies">
          Moeda
          <select id="currencies">
            { currencies.map((unit) => (
              <option
                key={ unit }
                value={ unit }
                name={ unit }
              >
                {unit}
              </option>)) }
          </select>
        </label>

        <select data-testid="method-input">
          { pay.map((payment) => (
            <option
              key={ payment }
              name={ payment }
              value={ payment }
            >
              {payment}
            </option>
          )) }
        </select>
        <select
          data-testid="tag-input"
        >
          { tag.map((tagUnit) => (
            <option
              key={ tagUnit }
              name={ tagUnit }
              value={ tagUnit }
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
  expencies: (objExpences) => dispatch(sentExpenses(objExpences)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
  expencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
