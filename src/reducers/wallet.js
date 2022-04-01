// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ENDPOINT_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ENDPOINT_API:
    return {
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
