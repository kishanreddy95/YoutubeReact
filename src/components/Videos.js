import React, { Component } from 'react';
import './styles.css';

// eslint-disable-next-line
class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: [],
    };
    this.updateVideos = this.updateVideos.bind(this);
  }

  componentDidUpdate() {
    if (this.props.text !== this.state.searchText) {
      this.updateVideos(this.props); 
    }
  }

  updateVideos(props) {
    this.setState({ searchText: props.text });
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${props.text}&type=video&key=${key}`)
      .then(data => data.json())
      .then((videos) => {
        this.setState({ data: videos.items });
      });
  }

  render() {
    return (
      <div id="videos">
        {this.state.data.map((item) => {
          return (
            <div className="video-items">
              <iframe src={item.snippet.thumbnails.medium.url} width={item.snippet.thumbnails.medium.width} height={item.snippet.thumbnails.medium.height}></iframe>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Videos;
