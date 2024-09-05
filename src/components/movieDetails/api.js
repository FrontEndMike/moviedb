const API_KEY = 'a62fd138fc3adf6aa51790c63f1f498e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovie = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  return response.json();
};

export const fetchImages = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
  return response.json();
};

export const fetchCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return response.json();
};

export const fetchVideos = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  return response.json();
};

export const fetchSimilarMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`);
  return response.json();
};

export const fetchStreamingProviders = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`);
  return response.json();
};
