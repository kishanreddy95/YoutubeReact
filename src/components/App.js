import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './Search';
import Videos from './Videos';
import Playlist from './Playlist';

const App = () => (
  <Router>
    <Grid id="main" fluid>
      <Route path="/" render={({ match }) => <Search match={match} />} />
      <Row className="show-grid">
        <Route path="/" render={({ match }) => <Playlist match={match} />} />
        <Route path="/" render={({ match }) => <Videos match={match} />} />
      </Row>
    </Grid>
  </Router>
);


export default App;
