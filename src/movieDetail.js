import React, { Component } from 'react';
import styled from 'styled-components';
import { Poster } from './movies.js';
import Overdrive from 'react-overdrive';

const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';
const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

class movieDetail extends Component {
    state = {
        movie: {},
}
  
async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=a62fd138fc3adf6aa51790c63f1f498e&language=en-US`);
      const movie = await res.json();
      this.setState({
          movie,
      });
    } catch(e){
    console.log(e);
    }
}
    
	render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
        <Overdrive id={movie.id}>
          <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>Release Date: {movie.release_date}</h3>
            <p>Summary: {movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default movieDetail;

const MovieWrapper = styled.div `
  position: relative;
  padding-top: 30vh;
  padding-bottom: 30vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    padding-top: 20rem;
    padding-bottom: 20rem;
  }
  @media (max-width: 430px){
    padding-top: 10rem;
    padding-bottom: 0rem;
    height: 0rem;
  }
`;

const MovieInfo = styled.div `
  background: white;
  text-align: left;
  padding: 2rem;
  display: flex;
  > div{
    margin-left: 20px;
  }
  h1{
    margin-top: 0rem;
  }
  img{
    position: relative;
    top: -5rem;
    max-height: 15rem;
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 430px){
    display: block;
    h1,h3,p{
      position: relative;
      top: -5rem;
    }
  }
`;