import React from 'react';
import ReactDOM from 'react-dom';
import { Demo } from './Demo';

export const bootstrap = (id = 'legitimate-demo-root') => {
  ReactDOM.render(
    <Demo />,
    document.getElementById(id)
  );
};

export default bootstrap;
bootstrap();
