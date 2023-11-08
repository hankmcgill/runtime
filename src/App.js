import Header from './components/Header'
import Profile from './components/Profile'
import Footer from './components/Footer'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

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

export default function App() {
  return (
    <Authenticator loginMechanisms={['username', 'email']}>
      {({ signOut, user }) => (
        <main>
          <Header signOut={signOut} />
          <Profile user={user} />
          <Footer />
        </main>
      )}
    </Authenticator>
  )
}
