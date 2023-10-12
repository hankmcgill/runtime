import React from 'react';

export default function Profile ({user}) {

  console.log('user', user.pool.clientId)

  return (
    <main>
    <h1>Hello {user.username}</h1>
    </main>
  )
}