import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import './index.css';

import MovieWidget from './MovieWidget';
import reducer from './MovieWidget.reducer';
import MovieWidgetContainer from './MovieWidget.container';

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <MovieWidgetContainer/>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
