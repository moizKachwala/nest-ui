import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import storeCofiguration from "./store";
import { fromLocalStorage, toLocalStorage } from "./utils/storage";
import { SESSION_CONSTRUCT, SESSION_LOGIN_FULFILLED } from "./store/actions/session";

let authToken = fromLocalStorage('authToken', null);

if (authToken) {
  const { store } = storeCofiguration;
  store.dispatch({ type: SESSION_LOGIN_FULFILLED, payload: { authToken } });
  store.dispatch({ type: SESSION_CONSTRUCT, payload: {} });
}
else {
  toLocalStorage('authToken', null);
  authToken = undefined;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={storeCofiguration.store}>
    <BrowserRouter basename="">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
