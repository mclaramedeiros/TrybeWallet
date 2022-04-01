import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">Total: 0</p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchToApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
