import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import { Container } from './styles';
import './config/ReactotronConfig';
import {persistor, store} from './store';
import Routes from './routes';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}
