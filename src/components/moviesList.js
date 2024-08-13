import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Movie from './movies';
import debounce from 'lodash.debounce';

const MoviesList = ({ favorites, onToggleFavorite, isFavorite }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

  const fetchMovies = async (newPage = 1, isInitialSearch = false) => {
    if (!query) return; // Avoid fetching if there's no query

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}${encodeURIComponent(query)}&page=${newPage}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      let filteredMovies = data.results.filter(movie => movie.backdrop_path && movie.poster_path);

      if (isInitialSearch) {
        filteredMovies = filteredMovies.slice(0, 6); // Initial search limit
        setMovies(filteredMovies); // Set movies for the first search
      } else {
        setMovies(prevMovies => [...prevMovies, ...filteredMovies]); // Append movies for subsequent pages
      }

      setTotalResults(data.total_results);
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of the fetchMovies function
  const debouncedFetchMovies = useCallback(
    debounce((query, isInitialSearch) => fetchMovies(1, isInitialSearch), 500),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedFetchMovies(query, true);
    } else {
      setMovies([]); // Clear movies if the query is empty
    }
  }, [query, debouncedFetchMovies]);

  const handleSearch = () => {
    setPage(1); // Reset page to 1 for new search
    fetchMovies(1, true); // Perform initial search
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage); // Increment page number
    fetchMovies(nextPage); // Fetch movies for the next page
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  console.log("Current favorites in MoviesList:", favorites);

  const totalPages = Math.ceil(totalResults / 20);
  const shouldShowMoreButton = movies.length > 0 && page < totalPages;

  return (
    <>
      <div className='search-contain'>
        <input
          className='search-bar'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies"
        />
        <button 
          className='button'
          onClick={handleSearch} 
        >
          Search
        </button>
      </div>
      {isLoading && <p className='loading'>Loading...</p>}
      {error && <p className='loading'>{error}</p>}
      <div className='container'>
        <div className='flex flex-wrap'>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movie 
                key={movie.id} 
                movie={movie}
                onToggleFavorite={onToggleFavorite} // Pass the function as a prop
                isFavorite={isFavorite(movie)} // Pass the result of the function as a prop
              />
            ))
          ) : (
            !isLoading && !error && <p className='no-movies-found'>Try searching a movie title.</p>
          )}
        </div>
        {shouldShowMoreButton && (
          <div className="show-more-parent flex justify-content-center">
            <button className='show-more-button button' onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

MoviesList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      backdrop_path: PropTypes.string.isRequired,
    })
  ).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

export default MoviesList;
