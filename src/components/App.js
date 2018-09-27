import React, { Component } from 'react';
import Search from './Search';
import Videos from './Videos';

// eslint-disable-next-line
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedText: '',
    };
    this.searchText = this.searchText.bind(this);
  }

  searchText(dataFromSearch) {
    this.setState({ returnedText: dataFromSearch });
  }

  render() {
    return (
      <div>
        <Search searchText={this.searchText} />
        <Videos text={this.state.returnedText}/>
      </div>
    );
  }
}

export default App;
