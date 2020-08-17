import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './movies';

class moviesList extends PureComponent {
    state = {
        movies: []
}
  
async componentDidMount() {
    try {
    const SEARCH_QUERY = "James Bond 007";
    const API_KEY = "a62fd138fc3adf6aa51790c63f1f498e";
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${SEARCH_QUERY}&page=1&include_adult=false`;
    const res = await fetch(`${API_URL}`);
    const movies = await res.json();
    this.setState({
        movies: movies.results
    })
    } catch(e){
    console.log(e);
    }
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