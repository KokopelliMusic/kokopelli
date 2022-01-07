import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useContext, useState } from 'react'
import { redirect } from '../../util'
import './NewPlaylist.css'

const NewPlaylist = () => {

  const [name, setName] = useState('')

  const click = () => {
    if (name.length === 0) {
      alert('Please enter a valid name')
    }

    window.sipapu.Playlist.create(name)
      .then(() => redirect('/home'))
      .catch(err => {
        console.error(err)
        alert('Something went wrong, try reloading')
      })
  }

  return <IonPage>
    <IonContent>
      <div id="new" className="background">
        <div className="header width-90">
          <a href="/home" className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Back</span>
          </a>
        </div>

        <h1 className="text-center">
          Create a new playlist
        </h1>
        <div id="input">
          <IonInput
            placeholder="Name"
            type="text"
            clearInput
            autofocus
            onIonChange={e => setName(e.detail.value!)}
          />

          <IonButton
            onClick={click}
          >
            Create
          </IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default NewPlaylist