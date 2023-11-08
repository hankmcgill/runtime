import React from 'react'

export default function Header(props) {
  return (
    <header>
      <h1>header</h1>
      <button onClick={props.signOut}>Sign out</button>
    </header>
  )
}
