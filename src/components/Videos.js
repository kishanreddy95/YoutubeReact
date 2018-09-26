import React, { Component } from 'react';

// eslint-disable-next-line
class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const key = 'AIzaSyCgk0leS6QuJi0RBfPCaiKkOieT6O_qQXg';

    // eslint-disable-next-line
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=linus+tech+tips&type=video&key=${key}`)
      .then(data => data.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Videos;
