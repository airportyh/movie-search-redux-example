import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import './index.css';
import $ from 'jquery';
import MovieWidget from './MovieWidget';
import reducer from './MovieWidget.reducer';

function changeQuery(value) {
  return { type: 'change-query', value: value };
}

function searchMovies(query) {
  return function(dispatch) {
    $.ajax({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      data: {
        api_key: 'fca7302d15175b6bbe117ec2d07df7e6',
        query: query
      }
    })
    .then(data => {
      console.log('new results', data);
      dispatch({
        type: 'movie-search-results',
        results: data.results
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message) || 'Something went wrong';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}



const MovieWidgetContainer = ReactRedux.connect(
  state => ({
    query: state.query,
    movieResults: state.movieResults,
    error: state.error
  }),
  {
    changeQuery: changeQuery,
    searchMovies: searchMovies
  }
)(MovieWidget);

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
