import React, { useState, useEffect } from 'react';
import { Poster } from './movies';
import Overdrive from 'react-overdrive';
import './styles/styles-details.css'; // Import the external CSS file

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const MovieDetail = ({ match }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=a62fd138fc3adf6aa51790c63f1f498e&language=en-US`);
        const movie = await res.json();
        setMovie(movie);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovie();
  }, [match.params.id]);

  return (
    <div className="movie-wrapper" style={{ backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
      <div className="movie-info">
        <Overdrive id={movie.id}>
          <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        </Overdrive>
        <div>
          <h1>{movie.title}</h1>
          <h3>Release Date: {movie.release_date}</h3>
          <p>Summary: {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
