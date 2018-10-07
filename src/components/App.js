import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './Search';
import Videos from './Videos';
import Playlist from './Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
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
          <Route path="/" render={({ match }) => <Search match={match} />} />
          <Row className="show-grid">
            <Route path="/" render={({ match }) => <Playlist match={match} />} />
            <Route path="/" render={({ match }) => <Videos match={match} />} />
          </Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
