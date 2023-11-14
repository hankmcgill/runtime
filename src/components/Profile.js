import { useEffect, useState } from 'react'
import Member from './Member'
import { click } from '@testing-library/user-event/dist/click'

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

  const [isChecked, setIsChecked] = useState(false)
  const checkHandler = () => {
    setIsChecked(!isChecked)
    setTreadmillInput(!treadmillInput)
  }

  const [clickedValue, setClickedValue] = useState('0')
  const difficultyHandler = (e) => {
    setClickedValue(e.target.value)
  }
  useEffect(() => {
    if (clickedValue === '0') {
      setDifficultyInput('easy')
    }
    if (clickedValue === '1') {
      setDifficultyInput('moderate')
    }
    if (clickedValue === '2') {
      setDifficultyInput('hard')
    }
  }, [clickedValue])

  // swap out URL for local testing
  const env = 'http://localhost:4000'
  // const env = ''

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
      <ul className="my-5 text-center" key={run.i}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title italic justify-center">
              {run.distance_in_miles} mile run
            </h2>
            <li>
              <span className="font-bold">Time: </span> {run.time_in_seconds}s
            </li>
            {run.shoes && (
              <li>
                <span className="font-bold">Shoes: </span> {run.shoe_model}
              </li>
            )}
            {run.difficulty && (
              <li>
                <span className="font-bold">Difficulty: </span> {run.difficulty}
              </li>
            )}
            {run.treadmill && <li className="italic">Ran on treadmill</li>}
            {run.notes && (
              <li>
                <span className="font-bold">Notes: </span>
                {run.notes}
              </li>
            )}

            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-secondary italic"
                onClick={() => deleteRun(run.id)}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </ul>
    ))
  } else {
    runs = <p>No runs found.</p>
  }

  return (
    <main>
      <div className="flex justify-center">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-accent font-extrabold my-5"
          onClick={() => document.getElementById('my_modal_5').showModal()}
        >
          New Run
        </button>
        <dialog id="my_modal_5" className="modal modal-middle">
          <div className="modal-box">
            <div className="modal-action card-body">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}

                <div className="flex flex-col justify-center items-center">
                  <h2 className="card-title italic">New run:</h2>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Distance: </span>
                    </label>
                    <input
                      type="number"
                      placeholder="Distance (miles)"
                      className="input input-sm input-bordered w-full max-w-xs"
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
                      type="number"
                      placeholder="Time (seconds)"
                      className="input input-sm input-bordered w-full max-w-xs"
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
                      className="input input-sm input-bordered w-full max-w-xs"
                      defaultValue={shoeInput}
                      onChange={(newText) => {
                        setShoeInput(newText.target.value)
                      }}
                    />
                  </div>

                  <div className="form-control w-full max-w-xs flex flex-row items-center justify-center">
                    <label className="label">
                      <span className="label-text italic">treadmill </span>
                    </label>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={isChecked}
                      onChange={checkHandler}
                    />
                    <label className="label">
                      <span className="label-text italic">outdoors </span>
                    </label>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Difficulty: </span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max="2"
                      value={clickedValue}
                      className="range"
                      step="1"
                      onChange={difficultyHandler}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                      <span>easy</span>
                      <span>moderate</span>
                      <span>hard</span>
                    </div>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Notes: </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Addl info here"
                      className="input input-sm input-bordered w-full max-w-xs"
                      defaultValue={notesInput}
                      onChange={(newText) => {
                        setNotesInput(newText.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <button className="btn btn-outline btn-error mr-1 italic">
                    Close
                  </button>
                  <button
                    onClick={postRun}
                    className="btn btn-outline btn-success italic"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {runs}
      {userData && <Member created_at={userData.created_at} />}
    </main>
  )
}
