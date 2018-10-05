import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Search from './Search';
import Videos from './Videos';
import Playlist from './Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistToReturn: {
        playlistId: '',
        item: [],
      },
      playlistsAvailable: [],
    };
    this.playlistItemFunction = this.playlistItemFunction.bind(this);
    this.passToPlaylist = this.passToPlaylist.bind(this);
    this.getNewPlaylists = this.getNewPlaylists.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
  }

  // Get newly created playlists
  getNewPlaylists(playlist) {
    this.setState({ playlistsAvailable: playlist });
  }

  // User clicks playlist menu
  playlistItemFunction(index) {
    const playlistListToReturn = this.state.playlistsAvailable[index];
    this.setState({ returnedData: playlistListToReturn }, () => {
      console.log(this.state.returnedData);
    });
  }

  // User clicks add to playlist
  passToPlaylist(video, id) {
    const playlists = this.state.playlistsAvailable.slice();
    playlists.forEach((playlist, index) => {
      if (index === id) {
        playlist.videos.push(video[0]);
      }
    });
    this.setState({ playlistsAvailable: playlists });
  }

  // Delete from playlist
  deleteFromPlaylist(playlistText, index) {
    const playlistsAvailable = this.state.playlistsAvailable.slice();

    // Looping available playlists and checking for the video to delete
    playlistsAvailable.forEach((playlist) => {
      if (playlist.name === playlistText) {
        playlist.videos.splice(index, 1);
      }
    });
    this.setState({ playlistsAvailable: playlistsAvailable });
  }

  render() {
    return (
      <Router>
        <Grid id="main" fluid>
          <Route path="/" render={({ match }) => <Search match={match} searchText={this.searchText} />} />
          <Row className="show-grid">
            <Route path="/" render={({ match }) => <Playlist match={match} playlistItem={this.state.playlistToReturn} playlistItemFunction={this.playlistItemFunction} getNewPlaylists={this.getNewPlaylists} />} />
            <Route path="/" render={({ match }) => { return <Videos match={match} passToParent={this.passToPlaylist} playlistsAvailable={this.state.playlistsAvailable} deletePlaylistItem={this.deleteFromPlaylist} />; }} />
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
