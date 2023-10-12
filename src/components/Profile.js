import {useEffect} from 'react';

import { getTest } from '../api/Api';

export default function Profile ({user}) {

  console.log('user', user.pool.clientId)

  useEffect(() => {
    getTest(user.pool.clientId)
  });

  return (
    <main>
    <h1>Hello {user.username}</h1>

    <button>click me</button>

    </main>
  )
}