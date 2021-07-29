import { AuthContext } from '../context/FirebaseAuthContext'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router'

interface ProtectedRouteProps {
    redirectTo: string,
    path: string,
    children: React.ReactNode
}

/*
    Based on https://medium.com/swlh/firebase-authentication-and-react-protecting-your-routes-18d6da04b4c3
*/

const ProtectedRoute = (props: ProtectedRouteProps) => {

    const auth = useContext(AuthContext)

    if (auth.userPresent) {
        if (auth.user === null) {
            return <Redirect to={props.redirectTo} />
        } else {
            return <Route exact path={props.path}>
                { props.children }
            </Route>
        }
    } else {
        return <h1>Loading...</h1>
    }
}

export default ProtectedRoute