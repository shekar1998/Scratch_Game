import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { SnackbarProvider } from 'notistack';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
