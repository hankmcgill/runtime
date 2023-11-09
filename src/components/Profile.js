// import { Auth } from 'aws-amplify'
// ;(await Auth.currentSession()).getIdToken().getJwtToken()

export default function Profile(props) {
  console.log('user:', props.user)

  return <main>{/* <h1>Hello {props.user.username}</h1> */}</main>
}
