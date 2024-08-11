/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import {
  Route,
  HashRouter,
  Switch,
  Link,
} from 'react-router-dom';
import './App.css';
import './styles/styles-details.css'; 
import './styles/styles.css';
import './styles/search.css';
import './styles/movie-card.css';
import './styles/modal.css';
import moviesList from './components/moviesList';
import movieDetail from './components/movieDetail';


const App = () => (
  <HashRouter basename='/'>
    <div className="App">
      <header className="search-header">
        <Link to="/">
          <div className='logo'>
            <img src="./images/mike-kaws.jpg" alt="Mike at the Kaws exhibit" />
            <div>
              <h1>Searchflix</h1>
              <p>A Movie search engine created by @FrontEndMike</p>
            </div>
          </div>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={moviesList} />
        <Route path="/:id" component={movieDetail} />
      </Switch>
    </div>
  </HashRouter >
);

export default App;
