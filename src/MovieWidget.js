import React from 'react';

export default class MovieWidget extends React.Component {
  render() {
    console.log('movies results?', this.props.movieResults);
    let resultDisplay;
    if (this.props.error) {
      resultDisplay = <p>{this.props.error}</p>;
    } else {
      resultDisplay = <div className="movie-results">
        <h3>Search Results</h3>
        <ul>
          {
            this.props.movieResults.map((movie, idx) =>
              <li key={idx}>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}/>
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
