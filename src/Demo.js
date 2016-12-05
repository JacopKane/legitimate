import React, { Component } from 'react';
import logo from './logo.png';
import pkg from '../package.json';
import './Demo.css';

let ghBadgeUrl = 'https://ghbtns.com/github-btn.html';
ghBadgeUrl += '?user=JacopKane&repo=legitimate&type=star&count=false&size=small';

export class Demo extends Component {

  render() {

    return (
      <div className="Demo">
        <div className="Demo-header">
          <img src={logo} className="Demo-logo" alt="logo" />
          <h1>{ pkg.name }</h1>
          <p>
            <a target="blank" alt="npm" href="https://www.npmjs.org/package/legitimate">
              <img role="presentation" src="https://img.shields.io/npm/v/legitimate.svg" alt="npm" />
            </a>
            &nbsp;
            <iframe src={ ghBadgeUrl }
                    frameBorder="0"
                    scrolling="0"
                    width="51px"
                    height="20px"></iframe>
          </p>
        </div>
        <div className="Demo-intro">
          <p>{ pkg.description }</p>
          <p><strong>TODO:</strong> Add a demo</p>
        </div>
      </div>
    );
  }
}

export default Demo;
