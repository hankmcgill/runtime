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

      console.log(result.runs)
    } catch (err) {
      console.error('error: ', err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const runs = userRuns.map((run, i) => {
    return (
      <ul className="mb-10">
        Run data:
        {run.id}
        <li>Distance: {run.distance_in_miles}</li>
        <li>Time: {run.time_in_seconds}</li>
        <li>Shoe: {run.shoe_model}</li>
        <li>Treadmill: {run.treadmill}</li>
        <li>Difficulty: {run.difficulty}</li>
        <li>Notes: {run.notes}</li>
      </ul>
    )
  })

  return (
    <main>
      {runs.length > 0 && runs}
      {userData && <article>Member since: {userData.created_at}</article>}
    </main>
  )
}
