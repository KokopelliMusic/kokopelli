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
import Init from './pages/init/Init'
import Spotify from './pages/add/Spotify'
import Home from './pages/home/Home'
import StartSession from './pages/session/StartSession'

import Playlists from './pages/home/Playlists'
import NewPlaylist from './pages/home/NewPlaylist'
import JoinSession from './pages/session/JoinSession'
import YouTube from './pages/add/YouTube'
import KokopelliRoute from './components/KokopelliRoute'

const App: React.FC = () => {

  if (window.sipapu.isLoggedIn()) {
    return <IonApp>
        <IonReactRouter>
          <IonRouterOutlet animated>
            <KokopelliRoute path="/add/spotify" component={Spotify} />
            <KokopelliRoute path="/add/youtube" component={YouTube} />
            <KokopelliRoute path="/init/register" component={Register} />
            <KokopelliRoute path="/init/signin" component={SignIn} />
            <KokopelliRoute path="/session" component={SessionPage} />
            <KokopelliRoute path="/playlists" component={Playlists} />
            <KokopelliRoute path="/newplaylist" component={NewPlaylist} />
            <KokopelliRoute path="/joinsession" component={JoinSession} />
            <KokopelliRoute path="/newsession" component={StartSession} />
            <KokopelliRoute path="/home" component={Home} />
            <KokopelliRoute path="/init" component={Init} />

            <Route>
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  } else {
    return <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated>
          <KokopelliRoute path="/home" component={Home} />
          <KokopelliRoute path="/init" component={Init} />
          <KokopelliRoute path="/init/register" component={Register} />
          <KokopelliRoute path="/init/signin" component={SignIn} />

          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  }
}

export default App
