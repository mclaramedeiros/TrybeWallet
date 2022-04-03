// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ENDPOINT_API, EXPENCES, FAILEDREQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENDPOINT_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case FAILEDREQUEST:
    return {
      ...state,
      error: action.error,
    };
  case EXPENCES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      // total: state.total + parseInt(action.payload.value, 10),
    };
  default:
    return state;
  }
};

export default wallet;
