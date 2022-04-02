import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
        <label htmlFor="">
          <input
            name="descrição"
            data-testid="description-input"
            value={ value }
          />
        </label>
        <select
          { ...currencies.map((unit) => (
            <option
              key={ unit }
              value={ unit }
              name={ unit }
            >
              {unit}
            </option>)) }
        />

        <select
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
        />

      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  value: PropTypes.string.isRequired,
};

export default Form;
