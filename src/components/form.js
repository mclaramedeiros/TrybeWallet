import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions/index';
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
  }

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

      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
