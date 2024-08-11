import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w780';

const Movie = ({ movie }) => (
  <div className='single-card'>
    <Link to={`/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movie-card">
        <div className="movie-details">
        <img
          className="card-img"
          src={`${BACKDROP_PATH}${movie.backdrop_path}`}
          alt={movie.title}
        />
          <h2 className="title">{movie.title}</h2>
          <p className="description">
            {movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview}
          </p>
          <p className='read-more'>Read More</p>
        </div>
      </div>
    </Link>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired, 
    backdrop_path: PropTypes.string.isRequired
  }).isRequired,
};

export default Movie;
