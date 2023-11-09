export default function Profile(props) {
  console.log('username:', props.user.username)
  console.log('Cognito ID:', props.user.pool.clientId)

  return <main>{/* <h1>Hello {props.user.username}</h1> */}</main>
}
