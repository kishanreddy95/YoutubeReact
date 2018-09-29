import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Search from './Search';
import Videos from './Videos';
import Playlist from './Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedData: '',
      playlistToReturn: {
        id: '',
        item: [],
      },
    };
    this.searchText = this.searchText.bind(this);
    this.playlistItemFunction = this.playlistItemFunction.bind(this);
    this.passToPlaylist = this.passToPlaylist.bind(this);
  }

  // User clicks search
  searchText(dataFromSearch) {
    this.setState({ returnedData: dataFromSearch });
  }

  // User clicks playlist menu
  playlistItemFunction(videosFromPlaylist) {
    console.log(videosFromPlaylist);
    this.setState({ returnedData: videosFromPlaylist });
  }

  // User clicks add to playlist
  passToPlaylist(data) {
    const obj = {
      id: data[0].etag,
      item: data[0],
    };
    this.setState({ playlistToReturn: obj });
    return this.state.playlistToReturn;
  }

  render() {
    return (
      <Grid id="main" fluid>
        <Search searchText={this.searchText} />
        <Row className="show-grid">
          <Playlist playlistItem={this.state.playlistToReturn} playlistItemFunction={this.playlistItemFunction} />
          <Videos passToParent={this.passToPlaylist} data={this.state.returnedData} />
        </Row>
      </Grid>
    );
  }
}

export default App;
