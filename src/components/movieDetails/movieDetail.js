import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Overdrive from 'react-overdrive';
import formatDate from '../formatDate';
import {
  fetchMovie,
  fetchImages,
  fetchCredits,
  fetchVideos,
  fetchSimilarMovies,
  fetchStreamingProviders
} from './api';
import {
  openModal,
  closeModal,
  showNextImage,
  showPreviousImage
} from './MovieDetailUtils';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w342';
const IMAGE_PATH = 'http://image.tmdb.org/t/p/w200';
const PROFILE_PATH = 'http://image.tmdb.org/t/p/w185';

const MovieDetail = ({ match }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query');
  const page = params.get('page');
  
  const [movie, setMovie] = useState({});
  const [images, setImages] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [streamingProviders, setStreamingProviders] = useState([]);

  useEffect(() => {
    // Store query and page in localStorage
    if (query) localStorage.setItem('query', query);
    if (page) localStorage.setItem('page', page);

    const fetchData = async () => {
      const movieData = await fetchMovie(match.params.id);
      setMovie(movieData);

      const imagesData = await fetchImages(match.params.id);
      setImages(imagesData.backdrops.slice(0, 8));

      const creditsData = await fetchCredits(match.params.id);
      const director = creditsData.crew.find(person => person.job === 'Director');
      setDirector(director ? director.name : 'N/A');

      const castWithImages = creditsData.cast.filter(member => member.profile_path);
      setCast(castWithImages.slice(0, 5));

      const videosData = await fetchVideos(match.params.id);
      const trailerVideo = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      setTrailerKey(trailerVideo ? trailerVideo.key : null);

      const similarMoviesData = await fetchSimilarMovies(match.params.id);
      const filteredMovies = similarMoviesData.results.filter(movie => movie.backdrop_path);
      setSimilarMovies(filteredMovies.slice(0, 3));

      const streamingProvidersData = await fetchStreamingProviders(match.params.id);
      if (streamingProvidersData.results.US && streamingProvidersData.results.US.flatrate) {
        setStreamingProviders(streamingProvidersData.results.US.flatrate);
      }
    };

    fetchData();
  }, [match.params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movie.id]);

  const handleShare = () => {
    const url = window.location.href;
    const text = `Check out this movie: ${movie.title}`;
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text,
        url,
      }).catch(console.error);
    } else {
      alert("Your browser doesn't support the Web Share API.");
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this movie: ${movie.title}`)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="movie-wrapper" style={{ backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})` }}>
      </div>
      <div className='container relative'>
        <h1 className='movie-title text-center'>
          {movie.title}
        </h1>
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
              {streamingProviders.length > 0 ? (
                <>
                  <h3>Watch on:</h3>
                  <div className="gap streaming-providers">
                    {streamingProviders.map((provider, index) => (
                      <div className="stream-contain" key={index}>
                        <a className="movie-card stream-card" href={`https://www.${provider.provider_name.toLowerCase().replace(' ', '')}.com`} target="_blank" rel="noopener noreferrer">
                          <img
                              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="provider-logo"
                            />
                          {provider.provider_name}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3>Watch on:</h3>
                  <p>Not currently streaming.</p>
                </>
              )}
            {trailerKey && (
              <button onClick={() => setIsTrailerModalOpen(true)} className="button trailer-button">Watch Trailer</button>
            )}
          </div>
        </div>

        {cast.length > 0 && (
          <div className="cast-section similar-movies">
            <h2 className='text-center'>Cast:</h2>
            <div className="image-grid gap flex flex-wrap justify-content-center">
              {cast.map((member, index) => (
                <div key={index} className="cast-member">
                  <div className='cast-contain'>
                    <img
                      src={`${PROFILE_PATH}${member.profile_path}`}
                      alt={member.name}
                      className="cast-image"
                    />
                  </div>
                                    <p className="cast-name">{member.name}</p>
                  <p className="cast-character">{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length > 0 && (
          <div className='similar-movies'>
            <h2 className='text-center'>Images from {movie.title}:</h2>
            <div className="image-grid gap flex flex-wrap justify-content-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`${IMAGE_PATH}${image.file_path}`}
                  alt={`Backdrop ${index + 1}`}
                  onClick={() => openModal(index, setSelectedImageIndex, setIsImageModalOpen)}
                />
              ))}
            </div>
          </div>
        )}
        {isImageModalOpen && selectedImageIndex !== null && (
          <div className="image-modal" onClick={() => closeModal(setIsImageModalOpen)}>
            <button className="prev-button" onClick={(e) => showPreviousImage(selectedImageIndex, images, setSelectedImageIndex)}>&lt;</button>
            <img
              src={`${IMAGE_PATH}${images[selectedImageIndex].file_path}`}
              alt={`Backdrop ${selectedImageIndex + 1}`}
              onClick={e => e.stopPropagation()} 
            />
            <button className="next-button" onClick={(e) => showNextImage(selectedImageIndex, images, setSelectedImageIndex)}>&gt;</button>
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

        {isTrailerModalOpen && trailerKey && (
          <div className="trailer-modal">
            <div className="trailer-container">
              <button onClick={() => setIsTrailerModalOpen(false)} className="trailer-close">&times;</button>
              <iframe
                title="movie-trailer"
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
        <div className='back-parent flex justify-content-center'>
          <Link to="/" className="button">Back to Movies</Link>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;

