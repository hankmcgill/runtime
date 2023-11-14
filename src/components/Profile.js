import { useEffect, useState } from 'react'

export default function Profile(props) {
  // pass props to state from Cognito
  const [username, setUsername] = useState(props.user.username)
  const [cognitoId, setCognitoId] = useState(props.user.attributes.sub)
  const [userData, setUserData] = useState()
  const [userRuns, setUserRuns] = useState([])

  const [distanceInput, setDistanceInput] = useState('')
  const [timeInput, setTimeInput] = useState('')
  const [shoeInput, setShoeInput] = useState('')
  const [treadmillInput, setTreadmillInput] = useState(false)
  const [difficultyInput, setDifficultyInput] = useState('')
  const [notesInput, setNotesInput] = useState('')

  // swap out URL for local testing
  // const env = 'http://localhost:4000'
  const env = ''

  const fetchRuns = async () => {
    const URL = env + `/profile?cognitoId=${cognitoId}&username=${username}`

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
    const URL = env + `/run?cognitoId=${cognitoId}`

    const payload = {
      distance_in_miles: distanceInput,
      time_in_seconds: timeInput,
      shoe_model: shoeInput,
      treadmill: treadmillInput,
      difficulty: difficultyInput,
      notes: notesInput
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
    const URL = env + `/run?cognitoId=${cognitoId}&runId=${id}`

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
        <li>Distance: {run.distance_in_miles} miles</li>
        <li>Time: {run.time_in_seconds}s</li>
        <li>Shoe: {run.shoe_model}</li>
        <li>Difficulty: {run.difficulty}</li>
        {run.treadmill && <li className="italic">Ran on treadmill</li>}
        <li>Notes: {run.notes}</li>
        <button
          className="btn-outline btn-secondary italic"
          onClick={() => deleteRun(run.id)}
        >
          delete
        </button>
      </ul>
    ))
  } else {
    runs = <p>No runs found.</p>
  }

  return (
    <main>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_5').showModal()}
      >
        New Run
      </button>
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Distance: </span>
                </label>
                <input
                  type="text"
                  placeholder="Distance (miles)"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={distanceInput}
                  onChange={(newText) => {
                    setDistanceInput(newText.target.value)
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Time: </span>
                </label>
                <input
                  type="text"
                  placeholder="Time (seconds)"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={timeInput}
                  onChange={(newText) => {
                    setTimeInput(newText.target.value)
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Shoes: </span>
                </label>
                <input
                  type="text"
                  placeholder="Shoe model"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={shoeInput}
                  onChange={(newText) => {
                    setShoeInput(newText.target.value)
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Treadmill? </span>
                </label>
                <input
                  type="text"
                  placeholder="True/false"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={treadmillInput}
                  onChange={(newText) => {
                    setTreadmillInput(newText.target.value)
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Difficulty: </span>
                </label>
                <input
                  type="text"
                  placeholder="Easy/Medium/Hard"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={difficultyInput}
                  onChange={(newText) => {
                    setDifficultyInput(newText.target.value)
                  }}
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Notes: </span>
                </label>
                <input
                  type="text"
                  placeholder="Addl info here"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue={notesInput}
                  onChange={(newText) => {
                    setNotesInput(newText.target.value)
                  }}
                />
              </div>

              <button className="btn btn-outline btn-secondary">Close</button>
              <button onClick={postRun} className="btn btn-outline btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {runs}
      {userData && <article>Member since: {userData.created_at}</article>}
    </main>
  )
}
