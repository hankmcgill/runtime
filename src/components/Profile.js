import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState('')
  const [cognitoId, setCognitoId] = useState('')

  const fetchProfile = async () => {
    // const reqOptions = {
    //   method: 'POST',
    //   body: {
    //     cognito_pool_id: '7000',
    //     username: 'hankold'
    //   }
    // }
  }

  useEffect(() => {
    setUsername(props.user.username)
    setCognitoId(props.user.pool.clientId)
    // console.log('username: ', username, 'cognitoID: ', cognitoId)

    // fetchProfile()
    // write GET req to db
    // pass response to state
    // render state in front end
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/test').then((res) =>
      res.json().then((res) => console.log('response: ', res))
    )
  }, [])

  return (
    <main>
      <h1>Hello {username}!</h1>
    </main>
  )
}
