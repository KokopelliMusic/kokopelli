import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { database } from '../../firebase'
import { redirect } from '../../util'
import './NewPlaylist.css'

const NewPlaylist = () => {

  const [name, setName] = useState('')
  const user = useContext(AuthContext)
  // const playlistRef = database.ref(`users/${user.user?.uid}/playlists`)
  const playlistRef = database.ref('playlists')
  const userPlaylistRef = database.ref(`users/${user.user?.uid}/playlists`)

  const click = () => {
    if (name.length === 0) {
      alert('Please enter a valid name')
    }

    let newList = playlistRef.push()

    userPlaylistRef
      .push(newList.key, )
      .then(() => newList.set({
        name,
        user: user.user!.uid,
        dateCreated: new Date().toISOString()
      }))
      .then(() => redirect('/home'))

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