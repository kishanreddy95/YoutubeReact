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
    if (this.props.data !== this.state.searchText
      && this.props.data.name !== this.state.searchText) {
      this.updateVideos(this.props.data);
    }
  }

  updateVideos(props) {
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';

    // Checking if search is clicked or a playlist item request
    if (typeof props === 'string') {
      this.setState({ searchText: props }, () => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${props}&type=video&key=${key}`)
          .then(data => data.json())
          .then((videos) => {
            this.setState({ data: videos.items });
          });
      });
    } else {
      this.setState({ searchText: props.name, data: props.videos }, () => {
      });
    }
  }

  addToPlaylist(etag, id) {
    const video = this.state.data.filter(item => item.etag === etag);
    this.props.passToParent(video, id);
  }

  render() {
    return (
      <div id="videos">
        {this.state.data !== undefined 
          ? this.state.data.map(item => (
            <Col md={4} className="video-items">
              <iframe id={item.etag} src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height} scrolling="no" />
              <p><strong>{item.snippet.title}</strong></p>
              <DropdownButton title="Add To Playlist">
                {this.props.playlistsAvailable.map( 
                  (playlist, index) => {
                    return <MenuItem id={index} onClick={() => this.addToPlaylist(item.etag, index)}>{playlist.name}</MenuItem>;
                  },
                )}
              </DropdownButton>
            </Col>
          ))
          : <h2>Playlist Empty</h2>}
          ;
      </div>
    );
  }
}

export default Videos;
