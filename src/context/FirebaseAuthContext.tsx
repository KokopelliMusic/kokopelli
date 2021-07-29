import { createContext, useState, useEffect } from 'react'
import { firebaseAuth } from '../firebase'

const FirebaseAuthContext = (props: any) => {

  const [state, setState] = useState({
    userPresent: false,
    user: null,
    listener: null
  })

  useEffect(() => {
    if (!state.listener) {
      setState({
        ...state,
        // @ts-expect-error
        listener: firebaseAuth.onAuthStateChanged(user => {
        setState((old: any) => {
          return {
            ...old,
            userPresent: true,
            user: !user ? null : user
          }
        })
      })
    })

  }
  
  return () => {
    // @ts-expect-error
    if (state.listener) state.listener()
  }
  
  }, [state])

  return (
    <AuthContext.Provider value={ state }>
      { props.children }
    </AuthContext.Provider>
  )
}

export const AuthContext = createContext({ userPresent: false, user: null, listener: null })
export default FirebaseAuthContext