import React, { useState } from 'react';
import Movie from './movies';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const [totalResults, setTotalResults] = useState(0); // Track the total number of results

  const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

  // Function to fetch movies based on the search query and page number
  const fetchMovies = async (newPage = 1, isInitialSearch = false) => {
    if (!query) return; // Return early if the query is empty

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}${encodeURIComponent(query)}&page=${newPage}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      
      // Filter out movies without a poster_path
      let filteredMovies = data.results.filter(movie => movie.backdrop_path && movie.poster_path);

      // If it's the initial search, return only 6 results
      if (isInitialSearch) {
        filteredMovies = filteredMovies.slice(0, 6);
      }

      // If this is the first page or initial search, replace the movies, otherwise append them
      if (newPage === 1 || isInitialSearch) {
        setMovies(filteredMovies);
      } else {
        setMovies(prevMovies => [...prevMovies, ...filteredMovies]);
      }

      setTotalResults(data.total_results); // Update the total results count
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    setPage(1); // Reset to the first page
    fetchMovies(1, true); // Initial search fetches only 6 results
  };

  // Handle "Show More" button click
  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage); // Load additional results
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalResults / 20); // Assume 20 results per page

  // Determine if "Show More" button should be shown
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
        <div className='justify-content-center flex flex-wrap'>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
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

export default MoviesList;
