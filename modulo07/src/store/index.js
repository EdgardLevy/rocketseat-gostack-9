import {createStore} from 'redux';

import rootReducers from './modules/rootReducers';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducers, enhancer);

export default store;
