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
        playlistId: '',
        item: [],
      },
      playlistsAvailable: [],
    };
    this.searchText = this.searchText.bind(this);
    this.playlistItemFunction = this.playlistItemFunction.bind(this);
    this.passToPlaylist = this.passToPlaylist.bind(this);
    this.getNewPlaylists = this.getNewPlaylists.bind(this);
  }

  // Get newly created playlists
  getNewPlaylists(playlist) {
    this.setState({ playlistsAvailable: playlist });
  }

  // User clicks search
  searchText(dataFromSearch) {
    this.setState({ returnedData: dataFromSearch });
  }

  // User clicks playlist menu
  playlistItemFunction(index) {
    let playlistListToReturn  = this.state.playlistsAvailable[index];
    this.setState({ returnedData: playlistListToReturn }, () => {
      console.log(this.state.returnedData);
    });
  }

  // User clicks add to playlist
  passToPlaylist(video, id) {
    const obj = {
      playlistId: id,
      item: video[0],
    };
    let playlists = this.state.playlistsAvailable.slice();
    playlists.forEach((playlist, index) => {
      if (index === id) {
        playlist.videos.push(obj.item);
      }
    });
    this.setState({ playlistsAvailable: playlists });
  }

  render() {
    return (
      <Grid id="main" fluid>
        <Search searchText={this.searchText} />
        <Row className="show-grid">
          <Playlist playlistItem={this.state.playlistToReturn} playlistItemFunction={this.playlistItemFunction} getNewPlaylists={this.getNewPlaylists} />
          <Videos passToParent={this.passToPlaylist} data={this.state.returnedData} playlistsAvailable={this.state.playlistsAvailable} />
        </Row>
      </Grid>
    );
  }
}

export default App;
