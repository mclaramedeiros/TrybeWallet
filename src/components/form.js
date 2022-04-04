import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, fetchCambio } from '../actions/index';
import Wallet from '../pages/Wallet';
// sentExpenses
// import Wallet from '../pages/Wallet';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      // isButtonDisabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const { fetchToCambio, expensesDetails } = this.props;
    console.log(expensesDetails);
    fetchToCambio();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // validadeBtn = () => {
  //   const { description,
  //     currency,
  //     value,
  //     tag,
  //     method,
  //     isButtonDisabled, } = this.state;

  //     this.setState({ isButtonDisabled: })
  // }
  total = () => {
    const { fetchToExpenses } = this.props;
    let initState = 0;
    fetchToExpenses.forEach((exps) => {
      initState += Number(exps.value)
      * Number(exps.exchangeRates[exps.currency].ask);
      return initState;
    });
    return initState.toFixed(2);
  };

  handleClick() {
    const { expensesDetails } = this.props;
    // const id = expenses.length;
    const { id } = this.state;
    expensesDetails(this.state);
    // const objExpenses = {
    //   id,
    //   value,
    //   tag,
    //   description,
    //   method,
    //   currency: parseInt(currency, 10),
    // };
    // console.log(objExpenses);

    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const totalProp = this.total();
    const { expensesDetails, expenses } = this.props;
    const { value, description, currency, tag, method } = this.state;
    const pay = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const options = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <form action="">
          <Wallet total={ totalProp } />
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
              {/* { expensesDetails.map((unit) => (
                <option
                  key={ unit }
                // data-testid={ currency }
                >
                  {unit}
                </option>)) } */}
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
        <table>
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
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesDetails: state.wallet.currencies,
  fetchToExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchApi()),
  expensesDetails: (state) => dispatch(fetchCambio(state)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  fetchToExpenses: PropTypes.func.isRequired,
  expensesDetails: PropTypes.func.isRequired,
  // sentExpenses: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
