import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import './config/ReactotronConfig';
import {ToastContainer} from 'react-toastify';
import Header from './components/Header';
import Routes from './routes';
import GlobalStyles from './styles/global';
import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
