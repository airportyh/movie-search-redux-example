import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';
import './index.css';
import $ from 'jquery';

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
        query: 'James Bond'
      }
    })
    .then(data => dispatch({
      type: 'movie-search-results',
      results: data.results
    }))
    .catch(err => {
      dispatch({
        type: 'error',
        error: err
      });
    });
  };
}

class MovieWidget extends React.Component {
  render() {
    console.log('movies results?', this.props.movieResults);
    return (
      <div>
        <input type="text"
          value={this.props.query}
          onChange={event => this.props.changeQuery(event.target.value)}/>
        <button onClick={() => this.props.searchMovies(this.props.query)}>Search Movies</button>
        <h3>Search Results</h3>
        <ul>
          {
            this.props.movieResults.map((movie, idx) =>
              <li key={idx}>
                {movie}
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

const MovieWidgetContainer = ReactRedux.connect(
  state => ({
    query: state.query,
    movieResults: state.movieResults
  }),
  {
    changeQuery: changeQuery,
    searchMovies: searchMovies
  }
)(MovieWidget);

const INITIAL_STATE = {
  query: '',
  movieResults: []
};
function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'change-query') {
    return Object.assign({}, state, {
      query: action.value
    });
  } else if (action.type === 'movie-search-results') {
    return Object.assign({}, state, {
      movieResults: action.results
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
