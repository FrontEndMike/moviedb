import React from 'react';
import { render } from 'react-dom';
import movieSearch from './movieSearch';

const Result = ({results}) => {
  return results.map((r, i) => <div key={i}>{r}</div>);
}

const Search = (props) => {
  const {
    searchQuery,
    onChange,
    search
  } = props;

  return <div>
    <input
      type="text"
      value={searchQuery}
      onChange={onChange}
    />
    <button onClick={search}>Search</button>
  </div>;
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      results: []
    }

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearchQueryChange(e) {
    this.setState({searchQuery: e.target.value});
  }

  onSearch(searchQuery) {
    // Simulate AJAX call
    try {
        const SEARCH_QUERY = movieSearch;
        const API_KEY = "a62fd138fc3adf6aa51790c63f1f498e";
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${SEARCH_QUERY}&page=1&include_adult=false`;
        const res =  fetch(`${API_URL}`);
        const movies =  res.json();

        setTimeout(() => {
            this.setState({ movies });
          }, 1000)

      } catch(e){
      console.log(e);
      }
  }

  render() {
    const {results, searchQuery} = this.state;

    return <div>
      <Search
        searchQuery={searchQuery}
        onChange={this.onSearchQueryChange}
        search={this.onSearch}
      />
      <Result results={results} />
    </div>;
  }
}

render(<Results />, document.getElementById('root'));