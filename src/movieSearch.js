import React, { Component } from 'react';
import styled from 'styled-components';

class movieSearch extends Component {
  
  render() {
    return (
      <FormField>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </FormField>
    );
  }
}


export default movieSearch;

const FormField = styled.div `
	display: grid;
	padding: 1rem;
`;
