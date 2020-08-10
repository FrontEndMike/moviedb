/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import moviesList from './moviesList';
import movieDetail from './movieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <h1>MOVIEDB</h1>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={moviesList} />
        <Route path="/:id" component={movieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
