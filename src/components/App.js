import React, { Component } from 'react';
// import App from './components/App';
import Search from './Search';
import Videos from './Videos';
// import './components/styles.css';

// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <Videos />
      </div>
    );
  }
}

export default App;
