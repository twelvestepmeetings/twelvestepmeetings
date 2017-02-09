import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Meetings from './Meetings';
import Meeting from './Meeting';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meetings" component={Meetings} />
        <Route path="/meetings/:meetingId" component={Meeting} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
