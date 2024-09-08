import MoviesList from './components/moviesList';

const Home = ({ favorites, handleToggleFavorite, isFavorite }) => {
  return (
    <MoviesList
      favorites={favorites}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={isFavorite}
    />
  );
};

export default Home;
