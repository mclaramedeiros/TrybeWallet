// Coloque aqui suas actions
// import API from '../services/api';

export const ENDPOINT_API = 'API';
export const LOGIN = 'LOGIN';

export const login = (payload) => ({ type: LOGIN, payload });
export const endpointAPI = (currencies) => ({
  type: ENDPOINT_API,
  currencies,
});

export const fetchApi = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const result = await fetch(url);
  const data = await result.json();
  const selectedKeys = Object.keys(data).filter((callback) => callback !== 'USDT');
  dispatch(endpointAPI(selectedKeys));
};
