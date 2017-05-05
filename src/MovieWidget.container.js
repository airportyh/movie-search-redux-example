import * as ReactRedux from 'react-redux';
import MovieWidget from './MovieWidget';
import * as actions from './MovieWidget.actions';

const MovieWidgetContainer = ReactRedux.connect(
  state => ({
    query: state.query,
    movieResults: state.movieResults,
    error: state.error
  }),
  actions
)(MovieWidget);

export default MovieWidgetContainer;
