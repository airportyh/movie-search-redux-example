import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import './index.css';

class MovieWidget extends React.Component {
  render() {
    return <h1>I am movie</h1>;
  }
}

const MovieWidgetContainer = ReactRedux.connect(
  null,
  null
)(MovieWidget);

function reducer(state = {}, action) {
  return state;
}

const store = Redux.createStore(reducer);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <MovieWidgetContainer/>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
