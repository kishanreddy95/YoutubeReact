import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Col, Popover, OverlayTrigger, ButtonToolbar, ControlLabel, FormControl,
  Button,
} from 'react-bootstrap';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      playlistItems: [],
    };
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.updatePlaylists = this.updatePlaylists.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  componentDidUpdate(nextProps, nextState) {
    // Making sure that the playlistItem is present to prevent infinite looping
    if (this.props.playlistItem.playlistId !== this.state.id) {
      this.state.playlistItems.forEach((item) => {
        if (item.videos.length === 0) {
          this.updatePlaylists(this.props);
        } else {
          let count = 0;
          item.videos.forEach((video) => {
            // Checking if video is already present in a playlist
            if (video.etag === this.props.playlistItem.item.etag) {
              count = 1;
            }
          });
          // If video is not present update the playlist
          if (count !== 1) {
            this.updatePlaylists(this.props);
          }
        }
      });
    }
  }

  // Update the existing playlists
  updatePlaylists(props) {
    const playlists = this.state.playlistItems.slice();

    // Checking which playlist video belongs to and pushing it
    playlists.forEach((playlist, index) => {
      if (index === props.playlistItem.playlistId) {
        playlist.videos.push(props.playlistItem.item);
      }
    });
    this.setState({ playlistItems: playlists, id: props.playlistItem.playlistId });
  }

  // View the playlists added
  displayPlaylists(index) {
    this.props.playlistItemFunction(this.state.playlistItems[index]);
  }

  // Creatting a new playlist
  createPlaylist() {
    const playlistItems = this.state.playlistItems.slice();
    // Creates an empty playlist object
    const playlistObject = {
      name: this.playlistname.value,
      videos: [],
    };

    // Pushing the playlist object into to existing playlists
    playlistItems.push(playlistObject);

    // Update the playlistItems state
    this.setState({ playlistItems: playlistItems });

    // Passing available playlists to the parent App.js component
    this.props.getNewPlaylists(playlistItems);
  }

  render() {
    const createPlaylistPopover = (
      <Popover id="popover-positioned-bottom" title="Enter Name for Playlist">
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          placeholder="Enter text"
          inputRef={(input) => { this.playlistname = input; }}
        />
        <br />
        <Button bsStyle="primary" type="submit" onClick={this.createPlaylist}>Create</Button>
      </Popover>
    );
    return (
      <Col md={2}>
        <ListGroup>
          <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="bottom" overlay={createPlaylistPopover}>
              <ListGroupItem>Create a Playlist</ListGroupItem>
            </OverlayTrigger>
          </ButtonToolbar>
        </ListGroup>
        <ListGroup id="list-of-playlists">
          {this.state.playlistItems.map(
            (item, index) => <ListGroupItem playlistId={index} onClick={() => { this.displayPlaylists(index); }}>{item.name}</ListGroupItem>,
          )}
        </ListGroup>
      </Col>

    );
  }
}

export default Playlist;
