// Coloque aqui suas actions
// import API from '../services/api';

export const ENDPOINT_API = 'API';
export const LOGIN = 'LOGIN';
export const EXPENCES = 'EXPENCES';
export const FAILEDREQUEST = 'FAILEDREQUEST';

export const login = (email) => ({ type: LOGIN, email });

export const endpointAPI = (currencies) => ({
  type: ENDPOINT_API,
  currencies,
});
export const sentExpenses = (payload) => ({
  type: EXPENCES,
  payload,
});

const failedRequest = (error) => ({ type: FAILEDREQUEST, error });

export const fetchApi = () => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const result = await fetch(url);
    const data = await result.json();
    const selectedKeys = Object.keys(data).filter((callback) => callback !== 'USDT');
    dispatch(endpointAPI(selectedKeys));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const fetchCambio = (state) => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const result = await fetch(url);
    const data = await result.json();
    state.exchangeRates = data;
    dispatch(sentExpenses(state));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};
