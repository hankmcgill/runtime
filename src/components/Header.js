import React from 'react';

export default function Header ({signOut}) {
  return (
    <header>
      <nav>
      runtime
      <button onClick={signOut}>Sign out</button>
      </nav>
  </header>
  )
}