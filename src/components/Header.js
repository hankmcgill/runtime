import React from 'react';

export default function Header ({signOut}) {
  return (
    <header>
      <nav>
      runtime is a fine app indeed!
      <button onClick={signOut}>Sign out</button>
      </nav>
  </header>
  )
}