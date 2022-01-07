import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { useEffect, useState } from 'react'
import { Sipapu } from 'sipapu'
import { Session } from '@supabase/gotrue-js';

window.sipapu = new Sipapu('kokopelli')

const SipapuContext = React.createContext<Session | null>(null)

const SipapuClient = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(window.sipapu.client.auth.session())

    window.sipapu.client.auth.onAuthStateChange((_event, session) => setSession(session))
  }, [])

  return <SipapuContext.Provider value={session}>
    <App />
  </SipapuContext.Provider>
}


ReactDOM.render(
  <React.StrictMode>
    <SipapuClient />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
