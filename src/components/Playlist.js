import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Col, Popover, OverlayTrigger, ButtonToolbar, ControlLabel, FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistItems: [],
    };
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  // View the playlists added
  displayPlaylists(index) {
    this.props.playlistItemFunction(index);
  }

  // Creating a new playlist
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
            (item, index) => <Link to={`${this.props.match.url}playlists/${item.name}`}><ListGroupItem playlistId={index} onClick={() => { this.displayPlaylists(index); }}>{item.name}</ListGroupItem></Link>,
          )}
        </ListGroup>
      </Col>

    );
  }
}

export default Playlist;
