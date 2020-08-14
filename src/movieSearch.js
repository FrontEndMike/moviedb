import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './movies';
// import moviesList from './moviesList';

class movieSearch extends Component {
  movieQuery (input) {
    try {
      const SEARCH_QUERY = input.value;
      const API_KEY = "a62fd138fc3adf6aa51790c63f1f498e";
      const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${SEARCH_QUERY}&page=1&include_adult=false`;
      const res =  fetch(`${API_URL}`);
      const movies =  res.json();
    } catch(e){
    console.log(e);
    }
  }

    render() {
        return (
          <div>
            <form onSubmit={movieSearch.prototype.movieQuery}>
              <h2>Search movies :</h2>
              <input type="text"/>
              <input type = 'submit' placeholder='Search' value = 'Search'></input>
            </form>
          </div>
        );
      }
}

export default movieSearch;

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