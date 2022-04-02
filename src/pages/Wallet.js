import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions/index';
import Form from '../components/form';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
  }

  render() {
    // const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    // const pay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">Total: 0</p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="despesa">
            {' '}
            Despesa
            <input
              type="text"
              data-testid="value-input"
              name="despesa"
            />
          </label>
          <label htmlFor="descrição">
            <input
              name="descrição"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currencies">
            {' '}
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
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {/* <select
            data-testid="method-input"
            { ...pay.map((payment) => (
              <option
                key={ payment }
                name={ payment }
                value={ payment }
              >
                {payment}
              </option>
            )) }
          />
          <select
            data-testid="tag-input"
            { ...tag.map((tagUnit) => (
              <option
                key={ tagUnit }
                name={ tagUnit }
                value={ tagUnit }
              >
                {tagUnit}
              </option>
            )) }
          /> */}

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  fetchCurrencies: state.wallet,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
