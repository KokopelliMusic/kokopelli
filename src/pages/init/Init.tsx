import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react'
import './Init.css'

const Init: React.FC = () => {
  return <IonPage>
    <IonContent fullscreen>
      <div id="init-grid" className="init-page background">
        <div className="init-row">
          <IonImg className="center kokopelli-img" src="./assets/kokopelli.png"/>
          <h1 className="center">
            Welcome to Kokopelli
          </h1>
          <div className="text-center bottom-text-font">
            Plays whatever music you want
          </div>
        </div>

        {/* Filler */}
        <div />

        <div className="init-row center">
          <IonButton className="width-90" href="/init/register">Create a new account</IonButton>
        </div>
        
        <div className="init-row center">
          <span>
            Already have an account? <a href="/init/signin">Sign in</a>
          </span>
        </div>
      </div>
    </IonContent>
  </IonPage>
}


export default Init