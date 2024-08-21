import React, { useState, useEffect, useCallback } from 'react';
import { Route, HashRouter, Switch, Link, useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './App.css';
import './styles/styles-details-2.css';
import './styles/styles.css';
import './styles/search.css';
import './styles/movie-card.css';
import './styles/modal.css';
import MoviesList from './components/moviesList';
import MovieDetail from './components/movieDetail';
import FavoritesPage from './components/favoritesList';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [headerClass, setHeaderClass] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const history = useHistory();  // Get the history object from React Router

  const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

  const handleToggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter(fav => fav.id !== movie.id)
        : [...prevFavorites, movie];
      console.log("Updated favorites in App:", updatedFavorites); // Debugging
      return updatedFavorites;
    });
  };

  const isFavorite = (movie) => {
    const result = favorites.some(fav => fav.id === movie.id);
    console.log("Is movie favorite in App:", result); // Debugging
    return result;
  };

  const fetchMovies = async (query) => {
    if (!query) return;

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}${encodeURIComponent(query)}&page=1`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();

      const filteredMovies = data.results.filter(movie => movie.backdrop_path && movie.poster_path);
      setSearchResults(filteredMovies);
    } catch (error) {
      setError('Error fetching movies. Please try again.');
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(
    debounce((query) => fetchMovies(query), 500),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36) {
        setHeaderClass('scroll');
      } else {
        setHeaderClass('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (query) {
      debouncedFetchMovies(query);
    } else {
      setSearchResults([]);
    }
  }, [query, debouncedFetchMovies]);

  const handleSearch = () => {
    fetchMovies(query);
    history.push('/');  // Navigate back to the root page after a search
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <HashRouter basename='/'>
      <div className="App">
        <header className={`search-header  ${headerClass}`}>
          <Link to="/">
            <div className='logo'>
              <div>
                <h1>Searchflix</h1>
                <p>A Movie search engine created by @FrontEndMike</p>
              </div>
            </div>
          </Link>
          {headerClass && (
            <div className='header-search'>
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
          )}
          <Link to="/favorites">
            <div className='flex favorites-icon'>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`favorite-heart ${favorites.length > 0 ? 'active' : ''}`}
                  width="30px"
                  height="30px"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={favorites.length > 0 ? "red" : "transparent"}
                    stroke={favorites.length > 0 ? "red" : "white"}
                    strokeWidth="1"
                  />
                </svg>
            </div>
          </Link>
        </header>
        <Switch>
          <Route exact path="/" render={() => (
            <MoviesList
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          )} />
          <Route path="/favorites" render={() => (
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )} />
          <Route path="/:id" component={MovieDetail} />
        </Switch>
        {searchResults.length > 0 && (
          <div className='search-results'>
            {searchResults.map((movie) => (
              <div key={movie.id} className='search-result-item'>
                <Link to={`/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                  <p>{movie.title}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {isLoading && <p className='loading'>Loading...</p>}
        {error && <p className='loading'>{error}</p>}
      </div>
    </HashRouter>
  );
};

export default App;
