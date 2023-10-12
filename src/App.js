import Header from "./components/Header"
import Profile from "./components/Profile";
import Footer from "./components/Footer"
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports)

export default function App() {  
  return (
    <Authenticator loginMechanisms={['username','email']}>
      {({ signOut, user }) => {
        return (
        <body>
          <Header signOut={signOut}/>
          <Profile user={user} />
          <Footer />
        </body>
        )
      }}
    </Authenticator>
  );
}