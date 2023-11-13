import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState('')
  const [cognitoId, setCognitoId] = useState('')

  useEffect(() => {
    setUsername(props.user.username)
    setCognitoId(props.user.pool.clientId)

    fetch(`/profile?cognitoId=${cognitoId}&username=${username}`).then((res) =>
      res.json().then((res) => {
        console.log('response: ', res)
      })
    )
  }, [])

  return (
    <main>
      <h1>Hello {username}!</h1>
    </main>
  )
}
