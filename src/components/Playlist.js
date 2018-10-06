import React, { Component } from 'react';
import {
  ListGroup, ListGroupItem, Col, Popover, OverlayTrigger, ButtonToolbar, ControlLabel, FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlaylist, viewPlaylist } from '../redux/actions';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.playlistsAvailable !== nextProps) {
      return true;
    }
    return false;
  }

  // View the playlists added
  displayPlaylists(id) {
    const playlist = this.props.playlistsAvailable.filter((list, index) => {
      if (index === id) {
        return list.videos;
      }
    })[0];
    console.log(playlist.videos);
    this.props.sendPlaylistToDisplay(index);
  }

  // Creating a new playlist
  createPlaylist() {
    const playlistsAvailable = [...this.props.playlistsAvailable];
    // Creates an empty playlist object
    const playlistObject = {
      name: this.playlistname.value,
      videos: [],
    };

    // Pushing the playlist object into to existing playlists
    playlistsAvailable.push(playlistObject);

    // Dispatch Playlists available to Store
    this.props.sendAvailablePlaylistsToStore(playlistsAvailable);
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
          {this.props.playlistsAvailable.map(
            (item, index) => <Link to={`${this.props.match.url}playlists/${item.name}`}><ListGroupItem playlistId={index} onClick={() => { this.displayPlaylists(index); }}>{item.name}</ListGroupItem></Link>,
          )}
        </ListGroup>
      </Col>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlistsAvailable: state.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendAvailablePlaylistsToStore: (playlists) => {
      dispatch(createPlaylist(playlists));
    },
    sendPlaylistToDisplay: (playlistIndex) => {
      dispatch(viewPlaylist(playlistIndex));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
