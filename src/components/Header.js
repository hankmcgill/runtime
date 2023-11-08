import React, { useState, useEffect } from 'react'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

export default function Header(props) {
  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  )

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])

  return (
    <header className="navbar bg-base-100 px-4 sm:px-8">
      <div className="flex-1">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl italic">
            R u n t i m e
          </a>
        </div>
      </div>

      {/* Toggle button here */}
      <button>
        <label className="swap swap-rotate w-8 h-8">
          <input
            type="checkbox"
            onChange={handleToggle}
            // show toggle image based on localstorage theme
            checked={theme === 'light' ? false : true}
          />
          {/* light theme sun image */}
          <img
            src={sun}
            style={{ tintColor: 'red' }}
            alt="light"
            className="w-6 h-6 swap-on"
          />
          {/* dark theme moon image */}
          <img src={moon} alt="dark" className="w-6 h-6 swap-off" />
        </label>
      </button>

      <ul className="menu menu-horizontal px-1">
        <li>
          <details>
            <summary className="font-semibold italic">
              {props.user.username}
            </summary>
            <ul className="p-2 bg-base-100">
              <li className="italic">
                <button onClick={props.signOut}>sign out</button>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </header>
  )
}
