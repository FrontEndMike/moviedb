import React from 'react';
import PropTypes from 'prop-types';
import Movie from './movies'; 
import { Link } from 'react-router-dom';

const FavoritesPage = ({ favorites, onToggleFavorite }) => {
    console.log("Favorites in FavoritesPage:", favorites); // Debugging

    return (
        <div className="favorites-page">
            <h1 className='text-center'>Your Fave(s)</h1>
            <div className='container'>
                <div className='flex flex-wrap'>

                        {favorites.length > 0 ? (
                            favorites.map(movie => (
                                <Movie
                                    key={movie.id}
                                    movie={movie}
                                    onToggleFavorite={onToggleFavorite}
                                    isFavorite={true} // Always true in the favorites page
                                />
                            ))
                        ) : (
                            <div className='full-width'>
                                <p className='text-center'>No favorites added yet.</p>
                            </div>
                        )}

                </div>
                <div className='back-parent flex justify-content-center'>
                    <Link to={`/`} className="button">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

FavoritesPage.propTypes = {
    favorites: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            overview: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            backdrop_path: PropTypes.string.isRequired,
        })
    ).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};

export default FavoritesPage;
