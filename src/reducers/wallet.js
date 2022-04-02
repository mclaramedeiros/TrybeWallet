// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ENDPOINT_API, sentExpenses } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENDPOINT_API:
    return {
      currencies: action.currencies,
    };
  case sentExpenses:
    return {
      expences: [...state.expencies, action.expencies],
    };

  default:
    return state;
  }
};

export default wallet;

// function wallet(state = WALLETS, action) {
//   switch (action.type) {
//   case WALLET:
//     return { ...state,
//       currencies: action.payload.currencies,
//       apiExpenses: action.payload.expenses };
//   case REQUEST_CURRENCY:
//     return { ...state, isFetching: true };
//   case GET_
