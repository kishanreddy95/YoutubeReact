import React, { Component } from 'react';
import './styles.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchVideo } from '../redux/actions';

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

  // Send the search text to App Component on clicking search button
  searchButtonClickHandler() {
    this.props.searchVideo(this.state.inputText);
  }

  render() {
    return (
      <Row id="search">
        <Col md={2}>
          <img src="src/images/youtube.png" alt="YouTube Logo" />
        </Col>
        <Col md={8}>
          <input id="textbox" type="text" placeholder="Search..." onChange={this.getData} />
        </Col>
        <Col md={2}>
          <Link to={`${this.props.match.url}results`}><button onClick={this.searchButtonClickHandler} type="submit">Search</button></Link>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  { searchVideo },
)(Search);
