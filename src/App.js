import Login from "./components/Login";
import Profile from "./components/Profile";

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

// Configure Amplify in index file or root file
Amplify.configure(awsExports)

export default function App() {
  return (
    <Authenticator loginMechanisms={['username','email']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}