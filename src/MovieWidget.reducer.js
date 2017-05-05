const INITIAL_STATE = {
  query: '',
  movieResults: [],
  error: null
};
export default function reducer(state = INITIAL_STATE, action) {
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
