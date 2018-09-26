import React, { Component } from 'react';
import './styles.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
    this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);
    this.getData=this.getData.bind(this)
  }

  getData(event) {
    this.setState({
      inputText:event.target.value
    });
    event.preventDefault;
  }

  searchButtonClickHandler(event) {
    this.setState({
      inputText: this.state.inputText
    });
    console.log(this.state.inputText);
  }

  render() {
    return (
      <div id="search">
        <img src="src/images/youtube.png" alt="YouTube Logo" />
        <input id="textbox" type="text" placeholder="Search..." onChange={this.getData}/>
        <button onClick={this.searchButtonClickHandler} type="submit">Search</button>
      </div>
    );
  }
}

export default Search;
