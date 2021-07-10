import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import './Home.css'

// TODO check session and redirect to /session or /init


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <a href="/init">init</a>
      </IonContent>
    </IonPage>
  )
}

export default Home
