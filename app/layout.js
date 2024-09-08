"use client";

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link'; // Use next/link for routing
import './styles/search.css';
import './styles/styles.css';
import './styles/search.css';
import './styles/movie-card.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function Layout({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [headerClass, setHeaderClass] = useState('');

  const handleToggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter(fav => fav.id !== movie.id)
        : [...prevFavorites, movie];
      return updatedFavorites;
    });
  };

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.id === movie.id);
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
    <html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Searchflix - A Movie search engine created by @FrontEndMike<"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700|Montserrat:300" rel="stylesheet" />

    <title>Searchflix - A Movie search engine created by @FrontEndMike</title>
  </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <header className={`search-header ${headerClass}`}>
              <Link href="/">
                <div className='logo'>
                  <div>
                    <h1>Searchflix</h1>
                    <p>A Movie search engine created by @FrontEndMike</p>
                  </div>
                </div>
              </Link>

              <Link href="/favorites">
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

            {/* The actual page content will be injected here */}
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
