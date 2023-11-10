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

    // fetch('/profile', reqOptions)
    //   .then(
    //     (resp) => resp.json() // this returns a promise
    //   )
    //   .then((resp) => {
    //     console.log(resp)
    //     console.log(resp.body)
    //     // for (const repo of repos) {
    //     //   console.log(repo.name)
    //     // }
    //   })
    //   .catch((ex) => {
    //     console.error(ex)
    //   })

    fetch('127.0.0.1:4000/test')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log('response: ', resp)
      })
  }

  // fetch('https://api.github.com/users/xiaotian/repos')
  //   .then(
  //     (resp) => resp.json() // this returns a promise
  //   )
  //   .then((repos) => {
  //     for (const repo of repos) {
  //       console.log(repo.name)
  //     }
  //   })
  //   .catch((ex) => {
  //     console.error(ex)
  //   })
  // }

  useEffect(() => {
    setUsername(props.user.username)
    setCognitoId(props.user.pool.clientId)
    // console.log('username: ', username, 'cognitoID: ', cognitoId)

    fetchProfile()
    // write GET req to db
    // pass response to state
    // render state in front end
  }, [])

  return <main>{/* <h1>Hello {props.user.username}</h1> */}</main>
}
