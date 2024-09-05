import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import './App.css';
import './styles/styles-details-2.css';
import './styles/styles.css';
import './styles/search.css';
import './styles/movie-card.css';
import './styles/modal.css';
import MoviesList from './components/moviesList';
import MovieDetail from './components/movieDetails/movieDetail';
import FavoritesPage from './components/favoritesList';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [headerClass, setHeaderClass] = useState('');

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

  return (
    <QueryClientProvider client={queryClient}> {/* Wrap your application with QueryClientProvider */}
      <BrowserRouter basename='/'>
        <div className="App">
          <header className={`search-header ${headerClass}`}>
            <Link to="/">
              <div className='logo'>
                <div>
                  <h1>Searchflix</h1>
                  <p>A Movie search engine created by @FrontEndMike</p>
                </div>
              </div>
            </Link>

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
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
