/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Switch,
  Link,
} from 'react-router-dom';
import './App.css';

import moviesList from './moviesList';
import movieDetail from './movieDetail';
import movieSearch from './movieSearch';

const App = () => (
  <HashRouter basename='/'>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <h1>MOVIEDB</h1>
        </Link>
      </header>
      <movieSearch />
      <Switch>
        <Route exact path="/" component={moviesList} />
        <Route path="/:id" component={movieDetail} />
      </Switch>
    </div>
  </HashRouter >
);

export default App;
