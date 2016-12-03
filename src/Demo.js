import React, { Component } from 'react';
import logo from './logo.png';
import './Demo.css';

export class Demo extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Legitimate</h2>
          <h4>Simple validation 👌</h4>
        </div>
          <p className="App-intro">
            <strong>TODO:</strong> Add a demo
          </p>
      </div>
    );
  }
}

export default Demo;
