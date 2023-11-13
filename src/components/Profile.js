import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState(props.user.username)
  const [cognitoId, setCognitoId] = useState(props.user.attributes.sub)
  const [userData, setUserData] = useState()

  const fetchData = async () => {
    setUsername(props.user.username)
    setCognitoId(props.user.pool.clientId)
    // swap out URL for local testing
    const URL = `/profile?cognitoId=${cognitoId}&username=${username}`
    // const URL = `http://localhost:4000/profile?cognitoId=${cognitoId}&username=${username}`

    try {
      const response = await fetch(URL)
      const result = await response.json()
      setUserData(result)
    } catch (err) {
      console.error('error: ', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main>
      {userData && (
        <ul>
          <li>Hello {userData.username}!</li>
          <li>Member since: {userData.created_at}!</li>
        </ul>
      )}
    </main>
  )
}
