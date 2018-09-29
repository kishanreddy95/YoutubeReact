import React, { Component } from 'react';
import './styles.css';
import {
  Col, DropdownButton, MenuItem,
} from 'react-bootstrap';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: [],
    };
    this.updateVideos = this.updateVideos.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }

  componentDidUpdate() {
    if (this.props.data !== this.state.searchText && this.props.data.id !== this.state.searchText) {
      this.updateVideos(this.props);
    }
  }

  updateVideos(props) {
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';

    // Checking if search is clicked or a playlist item request
    if (typeof props.data !== 'object') {
      this.setState({ searchText: props.data });
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${props.data}&type=video&key=${key}`)
        .then(data => data.json())
        .then((videos) => {
          this.setState({ data: videos.items });
        });
    } else {
      this.setState({ searchText: props.data.id, data: props.data.videos });
    }
  }

  addToPlaylist(etag) {
    const video = this.state.data.filter(item => item.etag === etag);
    this.props.passToParent(video);
  }

  render() {
    return (
      <div id="videos">
        {this.state.data.map(item => (
          <Col md={4} className="video-items">
            <iframe id={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
            <DropdownButton title="Add To Playlist">
              <MenuItem id={item.etag} onClick={() => this.addToPlaylist(item.etag)}>Playlist 1</MenuItem>
              <MenuItem id={item.etag} onClick={() => this.addToPlaylist(item.etag)}>Playlist 2</MenuItem>
            </DropdownButton>
          </Col>
        ))}
      </div>
    );
  }
}

export default Videos;
