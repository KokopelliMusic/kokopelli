import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React, { useState } from 'react'
import { redirect } from '../../util'
import './Guest.css'

const Guest: React.FC = () => {

  const [name, setName] = useState<string>()

  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    if (name && name.length > 1) {
      redirect('/session')
    } else {
      alert('Please enter a username')
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className="background" id="init-guest">
          <div className="header width-90">
            <a href="/init" className="back">
              <IonIcon icon={arrowBack} className="back-icon"/>
              <span>Back</span>
            </a>
          </div>

          <h1 className="title center">
            Sign in as guest
          </h1>

          <div className="center">
            <p className="text-center">
              As a guest you can only edit existing <br/> playlists
            </p>
          </div>

          <div className="center">
            <IonInput
              className="width-90 guest-input"
              autocomplete="on"
              autofocus
              clearInput
              inputMode="text"
              minlength={2}
              value={name}
              placeholder="Username" 
              onIonChange={e => setName(e.detail.value!)}/>
          </div>

          <div className="center">
            <IonButton className="width-90" onClick={onSubmit}>
              Submit
            </IonButton>
          </div>

          <div className="center">
            <span className="text-center">
              By using a guest account, you agree to our&nbsp;
              <a href="https://cdn.nierot.com/memes/trollface.png">Terms of Use</a> and&nbsp; 
              <a href="https://cdn.nierot.com/memes/trollface.png">Privacy Policy</a>
            </span>
          </div>

          {/* filler */}
          <div />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Guest