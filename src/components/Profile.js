import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState(props.user.username)
  const [cognitoId, setCognitoId] = useState(props.user.attributes.sub)
  const [userData, setUserData] = useState()
  const [userRuns, setUserRuns] = useState([])

  const fetchData = async () => {
    setUsername(props.user.username)
    setCognitoId(props.user.pool.clientId)
    // swap out URL for local testing
    // const URL = `/profile?cognitoId=${cognitoId}&username=${username}`
    const URL = `http://localhost:4000/profile?cognitoId=${cognitoId}&username=${username}`

    try {
      const response = await fetch(URL)
      const result = await response.json()
      setUserData(result)
      setUserRuns(result.runs)
    } catch (err) {
      console.error('error: ', err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  let runs = ''
  if (userRuns.length > 0) {
    runs = userRuns.map((run) => {
      return (
        <ul className="m-10" key={run.i}>
          <li>Distance: {run.distance_in_miles} miles</li>
          <li>Time: {run.time_in_seconds}s</li>
          <li>Shoe: {run.shoe_model}</li>
          <li>Difficulty: {run.difficulty}</li>
          {run.treadmill && <li className="italic">Ran on treadmill</li>}
          <li>Notes: {run.notes}</li>
        </ul>
      )
    })
  }

  return (
    <main>
      {runs}
      {userData && <article>Member since: {userData.created_at}</article>}
    </main>
  )
}
