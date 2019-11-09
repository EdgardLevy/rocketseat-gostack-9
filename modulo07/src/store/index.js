import {createStore} from 'redux';

import rootReducers from './modules/rootReducers';

const store = createStore(rootReducers);

export default store;
