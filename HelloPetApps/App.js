import React from 'react';
import {Provider} from 'react-redux';

import Router from './app/src/router/Router';
import {store} from './app/src/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
