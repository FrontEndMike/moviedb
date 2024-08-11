import React, { useState, useEffect } from 'react';
import './styles/styles.css'; // Importing the external CSS
import Movie from './movies';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';
        const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        const res = await fetch(API_URL);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="MovieGrid"> {/* Apply class from external CSS */}
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
