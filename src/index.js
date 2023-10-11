import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify in index file or root file
Amplify.configure(awsExports)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);