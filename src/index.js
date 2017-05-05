import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import './index.css';

function changeQuery(value) {
  return { type: 'change-query', value: value };
}

function searchMovies(query) {
  return function(dispatch) {
    dispatch({ type: 'test-action' });
  };
}

class MovieWidget extends React.Component {
  render() {
    return (
      <div>
        <input type="text"
          value={this.props.query}
          onChange={event => this.props.changeQuery(event.target.value)}/>
        <button onClick={() => this.props.searchMovies(this.props.query)}>Search Movies</button>
      </div>
    )
  }
}

const MovieWidgetContainer = ReactRedux.connect(
  state => ({ query: state.query }),
  {
    changeQuery: changeQuery,
    searchMovies: searchMovies
  }
)(MovieWidget);

const INITIAL_STATE = {
  query: ''
};
function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'change-query') {
    return Object.assign({}, state, {
      query: action.value
    });
  }
  return state;
}

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
