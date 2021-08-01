import { IonAvatar, IonContent, IonItem, IonLabel, IonList, IonNav, IonPage } from '@ionic/react'
import { ReactNode } from 'react'
import './Home.css'

const Home = () => {

  return <IonPage>
    <IonContent id="home">
      <div id="home-content" className="background">
        <div id="home-title">
          <h1>
            Hello {'Niels'}
          </h1>
          <h4>
            Select an item below to get started
          </h4>
        </div>
        <div id="home-list">
          <Button text="My playlists" to="/playlists" />
          <Button text="Start a new session" to="/home/newsession" />
          <Button text="Join a session" to="/home/joinsession" />
        </div>
      </div>
    </IonContent>
  </IonPage>
}

type ButtonProps = {
  text: string,
  to: string
}

const Button = ({ text, to }: ButtonProps)  =>
<a className="home-button" href={ to }>
  <h3 className="text-center">
    { text }
  </h3>
</a>

export default Home