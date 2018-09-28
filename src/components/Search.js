import React, { Component } from 'react';
import './styles.css';
import { Row, Col } from 'react-bootstrap';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
    this.searchButtonClickHandler = this.searchButtonClickHandler.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    this.setState({
      inputText: event.target.value,
    });
  }

  searchButtonClickHandler() {
    this.props.searchText(this.state.inputText);
  }

  render() {
    return (
      <Row id="search">
        <Col md={2}>
          <img src="src/images/youtube.png" alt="YouTube Logo" />
        </Col>
        <Col md={8}>
          <input id="textbox" type="text" placeholder="Search..." value={this.state.inputText} onChange={this.getData} />
        </Col>
        <Col md={2}>
          <button onClick={this.searchButtonClickHandler} type="submit">Search</button>
        </Col>
      </Row>
    );
  }
}

export default Search;
