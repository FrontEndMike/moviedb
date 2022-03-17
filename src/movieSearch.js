import React, { Component } from 'react';

class movieSearch extends Component {
    render() {
        return (
            <div>
                <form>
                <label>
                Search Movies:
                </label>
                <input
                    type="text"
                    value={this.props.searchString}
                    ref="searchStringInput"
                    onChange={this.handleChange}
                />
                
                <input type="submit" value="Search"  />
            </form>
            </div>
        );
    }
}

export default movieSearch;