import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
  return(
    <div>
      PageOne |  <Link to="/pagetwo">PageTwo</Link>
    </div>
  );
};

const PageTwo = () => {
  return(
    <div>
      <Link to="/">PageOne</Link> | PageTwo
    </div>
  );
};

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Route path="/" exact component={PageOne} />
        <Route path="/pagetwo" component={PageTwo} />
      </BrowserRouter>
    </div>
  );
}

export default App;
