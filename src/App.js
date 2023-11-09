import Header from './components/Header'
import Profile from './components/Profile'
import Footer from './components/Footer'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import './app.css'

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

export function App({ signOut, user }) {
  return (
    <main>
      <Header user={user} signOut={signOut} />
      <Profile user={user} />
      {/* <Footer /> */}
    </main>
  )
}

export default withAuthenticator(App, {})
