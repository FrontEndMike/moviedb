import React, { Component } from 'react';

class movieSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
        };
        
        this.publish = this.publish.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      
      handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
      }
    
      publish() {
        console.log( this.state.topicBox, this.state.payloadBox );
      }
      
      render() {
        return <div>
          <input 
            type="text" 
            name="search" 
            placeholder="Enter topic here..." 
            value={ this.state.search }
            onChange={ this.handleChange } 
          />
          
          
          <button value="Send" onClick={ this.publish }>Search</button>
        </div>
      }
}

export default movieSearch;