import React, { Component } from 'react';
import './styles.css';
import {
  Col, DropdownButton, MenuItem, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { searchResults, addToPlaylist, deleteVideoFromPlaylist } from '../redux/actions';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.updateVideos = this.updateVideos.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.deleteFromPlaylist = this.deleteFromPlaylist.bind(this);
  }

  componentDidUpdate(nextProps) {
    // Comparing the current props.text is not equal to next prop.text values to prevent re-rendering
    if (this.props.text !== nextProps.text && this.props.text !== '') {
      this.updateVideos(this.props);
    }
  }

  updateVideos(props) {
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';

    // Fetching videos from Youtube Api and dispatching them to update redux store
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${props.text}&type=video&key=${key}`)
      .then(data => data.json())
      .then((videos) => {
        this.props.sendVideosToStore(videos.items);
      });
  }

  // Adding videos to Playlists in the redux store
  addToPlaylist(etag, id) {
    const video = this.props.videos.videos.filter(item => item.etag === etag);
    const videoObj = {
      id,
      video: video[0],
    };
    this.props.sendVideoToPlaylist(videoObj);
  }

  deleteFromPlaylist(index) {
    // Passing the index which is the id for the playlist video to delete
    this.props.deleteVideoFromPlaylist(this.props.videos.type, index);
  }

  render() {
    return (
      <div id="videos">
        {this.props.videos.type === 'search'
          ? this.props.videos.videos.map(item => (
            <Col md={4} className="video-items">
              <iframe title={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
              <p><strong>{item.snippet.title}</strong></p>
              <DropdownButton title="Add To Playlist">
                {this.props.playlistsAvailable.map(
                  (playlist, index) => <MenuItem id={index} onClick={() => this.addToPlaylist(item.etag, index)}>{playlist.name}</MenuItem>,
                )}
              </DropdownButton>
            </Col>))
          : this.props.videos.videos.map((item, index) => (
            <Col md={4} className="video-items">
              <iframe title={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
              <p><strong>{item.snippet.title}</strong></p>
              <Button id={index} onClick={() => this.deleteFromPlaylist(index)}>Remove</Button>
            </Col>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.search,
  videos: state.videos,
  playlistsAvailable: state.playlists,
});

const mapDispatchToProps = dispatch => ({
  sendVideosToStore: (videos) => {
    dispatch(searchResults(videos));
  },
  sendVideoToPlaylist: (video) => {
    dispatch(addToPlaylist(video));
  },
  deleteVideoFromPlaylist: (playlistName, videoId) => {
    dispatch(deleteVideoFromPlaylist(playlistName, videoId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
