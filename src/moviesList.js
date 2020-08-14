import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './movies';

class moviesList extends PureComponent {
    state = {
        movies: []
}  
	render() {
    return (
        <MovieGrid>
            {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} overview={movie.overview}/> )}
        </MovieGrid>
    );
  }
}

export default moviesList;

const MovieGrid = styled.div `
	display: grid;
	padding: 1rem;
	grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 1rem;
    margin-top: 2rem;
	@media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 430px){
        grid-template-columns: repeat(2,1fr);
        grid-row-gap: 0.25rem;
        padding: 0.25rem;
    }
`;