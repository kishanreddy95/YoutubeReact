import React, { Component } from 'react';
import './styles.css';
import {
  Col, DropdownButton, MenuItem, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { searchResults } from '../redux/actions';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      playlistText: '',
      data: [],
    };
    this.updateVideos = this.updateVideos.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
  }

  componentDidUpdate() {
    // Comparing the new props is not equal to previous state values to prevent infinite looping
    if (this.props.text !== this.state.searchText) {
      this.updateVideos(this.props);
    }
  }

  updateVideos(props) {
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';

    // Checking if search is clicked or a playlist item request
    if (typeof props.text === 'string') {
      this.setState({ searchText: props.text }, () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${props.text}&type=video&key=${key}`)
          .then(data => data.json())
          .then((videos) => {
            this.setState({ playlistText: '', data: videos.items });
            this.props.sendToStore(videos.items);
          });
      });
    } else {
      this.setState({ searchText: '', playlistText: props.name, data: props.videos });
    }
  }

  addToPlaylist(etag, id) {
    const video = this.state.data.filter(item => item.etag === etag);
    this.props.passToParent(video, id);
  }

  deleteFromPlaylist(index) {
    // Passing the name of the playlist and the index where the playlist video is present
    this.props.deletePlaylistItem(this.state.playlistText, index);
  }

  render() {
    return (
      <div id="videos">
        {this.state.searchText !== ''
          ? this.state.data.map(item => (
            <Col md={4} className="video-items">
              <iframe title={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
              <p><strong>{item.snippet.title}</strong></p>
              <DropdownButton title="Add To Playlist">
                {this.props.playlistsAvailable.map( 
                  (playlist, index) => {
                    return <MenuItem id={index} onClick={() => this.addToPlaylist(item.etag, index)}>{playlist.name}</MenuItem>;
                  },
                )}
              </DropdownButton>
            </Col>))
          : this.state.data.map((item, index) => (
            <Col md={4} className="video-items">
              <iframe title={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
              <p><strong>{item.snippet.title}</strong></p>
              <Button id={index} onClick={() => this.deleteFromPlaylist(index)}>Delete</Button>
            </Col>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.search.text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendToStore: (data) => {
      dispatch(searchResults(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
