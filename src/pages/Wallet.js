import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, fetchCambio } from '../actions/index';
import Form from '../components/form';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
  }

  totalValue = () => {
    let valuePusher = 0;
    const { keyValue } = this.props;
    keyValue.forEach((element) => {
      valuePusher += Number(element.value)
      * Number(element.exchangeRates[element.currency].ask);
      return valuePusher;
    });
    return valuePusher.toFixed(2);
  }
  // Number(exps.value)
  //     * Number(exps.exchangeRates[exps.currency].ask);

  handleClick() {
    const { expensesDetails } = this.props;
    // const id = expenses.length;
    const { id } = this.state;
    expensesDetails(this.state);

    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleChange({ target: { name, value } }) {
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, fetchCurrencies, keyValue } = this.props;
    const allTheCategories = ['Descrição', 'Tag', 'Método de pagamento',
    'Valor', 'Moeda', 'Câmbio utilizado',
    'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            { this.totalValue() }
          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <Form
          currencies={ fetchCurrencies }
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }

        />
        <table>
          <thead>
            <tr>
              {allTheCategories.map((element) => (
                <th key={ element }>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keyValue.map((element) => (
              <tr key={ element.id }>
                <td key={ element.id }>
                  { element.description }
                </td>
                <td key={ element.id }>
                  { element.tag }
                </td>
                <td key={ element.id }>
                  { element.method }
                </td>
                <td key={ element.id }>
                  { Number(element.value).toFixed(2) }
                </td>
                <td key={ element.id }>
                  { (element.exchangeRates[element.currency].name).split('/', 1) }
                </td>
                <td key={ element.id }>
                  {Number(element.exchangeRates[element.currency].ask).toFixed(2) }
                </td>
                <td key={ element.id }>
                  {(Number(element.value)
                * Number(element.exchangeRates[element.currency].ask)).toFixed(2) }
                </td>
                <td key={ element.id }>
                  Real
                </td>
                <td key={ element.id }>
                  Editar/Exclui
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchApi()),
  expensesDetails: (state) => dispatch(fetchCambio(state)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  fetchCurrencies: state.wallet.currencies,
  keyValue: state.wallet.expenses,
  // total: state.wallet.,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
  expensesDetails: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  keyValue: PropTypes.func.isRequired,
  // total
  // currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
