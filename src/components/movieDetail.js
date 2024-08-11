import React, { useState, useEffect } from 'react';
import Overdrive from 'react-overdrive';
import { Link } from 'react-router-dom';
import formatDate from './formatDate';
import '../styles/styles-details.css';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w342';
const IMAGE_PATH = 'http://image.tmdb.org/t/p/w200';

const MovieDetail = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [images, setImages] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [director, setDirector] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);

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

    const fetchImages = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/images?api_key=a62fd138fc3adf6aa51790c63f1f498e`);
        const data = await res.json();
        setImages(data.backdrops.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=a62fd138fc3adf6aa51790c63f1f498e`);
        const data = await res.json();
        const director = data.crew.find(person => person.job === 'Director');
        setDirector(director ? director.name : 'N/A');
      } catch (e) {
        console.log(e);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=a62fd138fc3adf6aa51790c63f1f498e`);
        const data = await res.json();
        const trailerVideo = data.results.find(video => video.type === 'Trailer');
        setTrailer(trailerVideo ? `https://www.youtube.com/watch?v=${trailerVideo.key}` : null);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=a62fd138fc3adf6aa51790c63f1f498e&language=en-US`);
        const data = await res.json();
        setSimilarMovies(data.results.slice(0, 3)); // Limit to 3 similar movies
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovie();
    fetchImages();
    fetchCredits();
    fetchVideos();
    fetchSimilarMovies();
  }, [match.params.id]);

  return (
    <>
      <div className="movie-wrapper" style={{ backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
      </div>
      <div className='container'>
          <h1 className='movie-title text-center'>{movie.title}</h1>
          <em className='block text-center'>{movie.tagline}</em>
        <div className="movie-info">
          <Overdrive id={movie.id}>
            <img
              className="poster"
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>
          <div>
            <h3>Release Date:</h3>
            <p>{movie.release_date ? formatDate(movie.release_date) : 'N/A'}</p>
            <h3>Director:</h3>
            <p>{director}</p>
            <h3>Summary:</h3>
            <p>{movie.overview}</p>
            <h3>Vote Average:</h3>
            <p>{movie.vote_average}/10 with {movie.vote_count} votes</p>
            <h3>Genres:</h3>
            <p>
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map(genre => genre.name).join(', ')
                : 'No genres available'}
            </p>
            {trailer && (
              <a href={trailer} target="_blank" rel="noopener noreferrer" className="button trailer-button">Watch Trailer</a>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className="image-grid similar-movies gap flex flex-wrap justify-content-center">
            {images.map((image, index) => (
              <img key={index} src={`${IMAGE_PATH}${image.file_path}`} alt={`Backdrop ${index + 1}`} className="movie-image" />
            ))}
          </div>
        )}

        {similarMovies.length > 0 && (
          <div className="similar-movies">
            <h2 className='text-center'>Similar Movies:</h2>
            <div className="justify-content-center flex flex-wrap">
              {similarMovies.map(movie => (
                <div key={movie.id} className="single-card">
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
              ))}
            </div>
          </div>
        )}

        <div className='back-parent flex justify-content-center'>
          <Link to={`/`} className="button">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
