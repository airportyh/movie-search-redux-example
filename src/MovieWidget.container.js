import * as ReactRedux from 'react-redux';
import MovieWidget from './MovieWidget';
import * as actions from './MovieWidget.actions';

const MovieWidgetContainer = ReactRedux.connect(
  state => ({
    query: state.query,
    movieResults: state.movieResults,
    error: state.error
  }),
  {
    changeQuery: actions.changeQuery,
    searchMovies: actions.searchMovies
  }
)(MovieWidget);

export default MovieWidgetContainer;
