import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState(props.user.username)
  const [cognitoId, setCognitoId] = useState(props.user.attributes.sub)
  const [userData, setUserData] = useState()
  const [userRuns, setUserRuns] = useState([])

  const fetchRuns = async () => {
    // swap out URL for local testing
    const URL = `/profile?cognitoId=${cognitoId}&username=${username}`
    // const URL = `http://localhost:4000/profile?cognitoId=${cognitoId}&username=${username}`

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
    fetchRuns()
  }, [])

  const postRun = async () => {
    // swap out URL for local testing
    const URL = `/run?cognitoId=${cognitoId}`
    // const URL = `http://localhost:4000/run?cognitoId=${cognitoId}`

    const payload = {
      distance_in_miles: 4321,
      time_in_seconds: 9876,
      shoe_model: 'dunks',
      treadmill: false,
      difficulty: 'hard',
      notes: 'this is a test post'
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    try {
      const response = await fetch(URL, options)
      const result = await response.json()
      console.log('result ', result)
    } catch (err) {
      console.error('error: ', err)
    }
    fetchRuns()
  }

  const deleteRun = async (id) => {
    console.log('id: ', id)
    // // swap out URL for local testing
    const URL = `/run?cognitoId=${cognitoId}&runId=${id}`
    // const URL = `http://localhost:4000/run?cognitoId=${cognitoId}&runId=${id}`

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await fetch(URL, options)
      const result = await response.json()
      console.log('result ', result)
    } catch (err) {
      console.error('error: ', err)
    }
    fetchRuns()
  }

  let runs = null // Initialize as null
  if (userRuns && userRuns.length > 0) {
    runs = userRuns.map((run) => (
      <ul className="m-10" key={run.i}>
        <button className="btn-accent" onClick={() => deleteRun(run.id)}>
          delete
        </button>
        <li>Distance: {run.distance_in_miles} miles</li>
        <li>Time: {run.time_in_seconds}s</li>
        <li>Shoe: {run.shoe_model}</li>
        <li>Difficulty: {run.difficulty}</li>
        {run.treadmill && <li className="italic">Ran on treadmill</li>}
        <li>Notes: {run.notes}</li>
      </ul>
    ))
  } else {
    runs = <p>No runs found.</p>
  }

  return (
    <main>
      <button onClick={postRun} className="btn-primary">
        New Run
      </button>
      {runs}
      {userData && <article>Member since: {userData.created_at}</article>}
    </main>
  )
}
