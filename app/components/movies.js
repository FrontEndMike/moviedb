import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; // Use next/link for routing

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w780';

const Movie = ({ movie, onToggleFavorite, isFavorite, query, page, onClick }) => {
  return (
    <div className='single-card'>
      <Link 
        href={`/${movie.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={onClick} 
      >
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
            <div className='flex card-icons'>
              <p className='read-more'>Read More</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`favorite-heart ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation to movie detail
                  onToggleFavorite(movie); // Correctly toggle favorite
                }}
                width="30px"
                height="30px"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={isFavorite ? "red" : "none"}
                  stroke={isFavorite ? "red" : "black"}
                  strokeWidth="1"
                />
              </svg>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string.isRequired,
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default Movie;
