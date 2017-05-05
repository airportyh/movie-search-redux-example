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

class MovieWidget extends React.Component {
  render() {
    console.log('movies results?', this.props.movieResults);
    let resultDisplay;
    if (this.props.error) {
      resultDisplay = <p>{this.props.error}</p>;
    } else {
      resultDisplay = <div>
        <h3>Search Results</h3>
        <ul>
          {
            this.props.movieResults.map((movie, idx) =>
              <li key={idx}>
                {movie.title}
              </li>
            )
          }
        </ul>
      </div>;
    }
    return (
      <div>
        <input type="text"
          value={this.props.query}
          onChange={event => this.props.changeQuery(event.target.value)}/>
        <button onClick={() => this.props.searchMovies(this.props.query)}>Search Movies</button>
        {resultDisplay}
      </div>
    )
  }
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

const INITIAL_STATE = {
  query: '',
  movieResults: [],
  error: null
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
  } else if (action.type === 'error') {
    return Object.assign({}, state, {
      error: action.error
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
