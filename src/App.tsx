import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/global.css'

/* Routes */
import SignIn from './pages/init/SignIn'
import SessionPage from './pages/session/SessionPage'
import Register from './pages/init/Register'
import Guest from './pages/init/Guest'
import Init from './pages/init/Init'
import Spotify from './pages/add/Spotify'
import Home from './pages/home/Home'
import StartSession from './pages/session/StartSession'

import { FirebaseAuthProvider } from '@react-firebase/auth'
import firebase from './firebase'
import { FIREBASE_CONFIG } from './config.json'
import FirebaseAuthContext from './context/FirebaseAuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Playlists from './pages/home/Playlists'
import NewPlaylist from './pages/home/NewPlaylist'
import JoinSession from './pages/session/JoinSession'
import YouTube from './pages/add/YouTube'

const App: React.FC = () => {

  return (
    <FirebaseAuthProvider firebase={firebase} {...FIREBASE_CONFIG}>
      <FirebaseAuthContext>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet animated>
              <ProtectedRoute redirectTo="/init" path="/add/spotify">
                <Spotify />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/add/youtube">
                <YouTube />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/add/mp3">
                TODO MP3
              </ProtectedRoute>
              <Route exact path="/init/guest">
                <Guest />
              </Route>
              <Route exact path="/init/register">
                <Register />
              </Route>
              <Route exact path="/init/signin">
                <SignIn />
              </Route>
              <ProtectedRoute redirectTo="/init" path="/session">
                <SessionPage />
              </ProtectedRoute>
              
              <ProtectedRoute redirectTo="/init" path="/playlists">
                <Playlists />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/newplaylist">
                <NewPlaylist />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/newsession">
                <StartSession />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/joinsession">
                <JoinSession />
              </ProtectedRoute>
              <ProtectedRoute redirectTo="/init" path="/home">
                <Home />
              </ProtectedRoute>

              <Route exact path="/init">
                <Init />
              </Route>
              {/* Catch all else and redirect to home */}
              <Route>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </FirebaseAuthContext>
    </FirebaseAuthProvider>

  )
}

export default App
