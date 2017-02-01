import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import Home from './Home';
import Meetings from './Meetings/Meetings';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/meetings" component={Meetings} />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

export default App;
