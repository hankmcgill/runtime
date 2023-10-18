import {useEffect} from 'react';

import { getTest } from '../api/Api';

export default function Profile ({user}) {

  // console.log('user', user.pool.clientId)
  console.log('user', user)

  useEffect(() => {
    // getTest()
  }, []);

  return (
    <main>
    <h1>Hello {user.username}</h1>

    <button>click me</button>

    </main>
  )
}