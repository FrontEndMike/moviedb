import React, { useState, useEffect } from 'react';
import Overdrive from 'react-overdrive';
import { Link } from 'react-router-dom';
import formatDate from './formatDate';
import '../styles/styles-details.css';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w342';
const IMAGE_PATH = 'http://image.tmdb.org/t/p/w200';
const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';

const MovieDetail = ({ match }) => {
  const [movie, setMovie] = useState({});
  const [images, setImages] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); // Store only the video key
  const [director, setDirector] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal image
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // For trailer modal

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_KEY}&language=en-US`);
        const movie = await res.json();
        setMovie(movie);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/images?api_key=${API_KEY}`);
        const data = await res.json();
        setImages(data.backdrops.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };

    const fetchCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${API_KEY}`);
        const data = await res.json();
        const director = data.crew.find(person => person.job === 'Director');
        setDirector(director ? director.name : 'N/A');
      } catch (e) {
        console.log(e);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_KEY}`);
        const data = await res.json();
        const trailerVideo = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailerKey(trailerVideo ? trailerVideo.key : null);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        const filteredMovies = data.results.filter(movie => movie.backdrop_path); // Only include movies with backdrop path
        setSimilarMovies(filteredMovies.slice(0, 3)); // Limit to 3 similar movies
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

  const openImageModal = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const openTrailerModal = () => {
    setIsTrailerModalOpen(true);
  };

  const closeTrailerModal = () => {
    setIsTrailerModalOpen(false);
  };

  return (
    <>
      <div className="movie-wrapper" style={{ backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
      </div>
      <div className='container relative'>
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
          <div className='detailed-movie'>
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
            {trailerKey && (
              <button onClick={openTrailerModal} className="button trailer-button">Watch Trailer</button>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className='similar-movies'>
            <h2 className='text-center'>Images from {movie.title}:</h2>
            <div className="image-grid gap flex flex-wrap justify-content-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`${IMAGE_PATH}${image.file_path}`}
                  alt={`Backdrop ${index + 1}`}
                  className="movie-image"
                  onClick={() => openImageModal(`${BACKDROP_PATH}${image.file_path}`)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="modal" onClick={closeImageModal}>
            <div className='modal-body'>
              <span className="close">&times;</span>
              <img className="modal-content" src={selectedImage} alt="Selected" />
            </div>
          </div>
        )}

        {isTrailerModalOpen && (
          <div className="modal" onClick={closeTrailerModal}>
            <div className='modal-body' onClick={e => e.stopPropagation()}>
              <span className="close" onClick={closeTrailerModal}>&times;</span>
              <div className="video-responsive">
                <iframe
                  title="Trailer"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
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
