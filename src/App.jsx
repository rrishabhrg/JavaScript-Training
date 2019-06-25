/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Home } from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="root">
          <Home/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;