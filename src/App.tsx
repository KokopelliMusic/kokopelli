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
import Session from './pages/home/Session'
import Register from './pages/init/Register'
import Guest from './pages/init/Guest'
import Home from './pages/Home'
import Init from './pages/init/Init'
import Spotify from './pages/add/Spotify'

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated>
          <Route exact path="/add/spotify">
            <Spotify />
          </Route>
          <Route exact path="/add/youtube">
            
          </Route>
          <Route exact path="/add/mp3">
            
          </Route>
          <Route exact path="/init/guest">
            <Guest />
          </Route>
          <Route exact path="/init/register">
            <Register />
          </Route>
          <Route exact path="/init/signin">
            <SignIn />
          </Route>
          <Route exact path="/session">
            <Session />
          </Route>
          <Route exact path="/init">
            <Init />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          {/* Catch all else and redirect to home */}
          <Route>
            <Redirect to="/" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
