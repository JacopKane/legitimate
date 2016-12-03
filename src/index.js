import React from 'react';
import ReactDOM from 'react-dom';
import { Demo } from './Demo';

/** To determine if we are in launching demo instead of creating multiple entries **/
export const
  demo = (root) => {
    ReactDOM.render(
      <Demo />,
      root
    );
  },
  launchLegitimateDemo = (window = false, id = 'legitimate-demo-root') => {

    const rootElement = window.document.getElementById(id);

    if (rootElement === null) {
      return false;
    }

    demo(rootElement);
  };

((window = false) => {
  if (window) {
    window.launchLegitimateDemo = launchLegitimateDemo;
  }
}) (window);

export * from './lib/Legitimate';
