import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchApi, sentExpenses } from '../actions/index';

class Form extends React.Component {
  render() {
    const { currencies, expenses, onChange,
      onClick, value, description, currency, tag, method } = this.props;
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
            onChange={ onChange }
          />
        </label>
        <label htmlFor="description">
          <input
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ onChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ onChange }
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
          onChange={ onChange }
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
          onChange={ onChange }
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
          onClick={ onClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  // value: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
};

export default Form;
