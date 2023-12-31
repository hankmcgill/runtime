import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './input.css'

import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
