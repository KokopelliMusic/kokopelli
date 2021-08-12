import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { database } from '../../firebase'
import firebase from 'firebase'
import './Playlists.css'
import { arrowBack } from 'ionicons/icons'
import { redirect } from '../../util'
import { getPlaylists } from '../../storage/playlist'

const Playlists = () => {

  const [playlists, setPlaylists] = useState<any[]>([])
  const user = useContext(AuthContext)
  const playlistRef = database.ref(`users/${user.user?.uid}/playlists`)

  useEffect(() => {
    (async () => setPlaylists(await getPlaylists(user.user!.uid)))()
    // playlistRef
    //   .get()
    //   .then(snap => {
    //     let list: Object[] = []
    //     snap.forEach(p => { list.push(p.val()) })
    //     return list
    //   })
    //   .then(setPlaylists)
    //   .catch(err => {
    //     console.error(err)
    //     alert(err)
    //   })
  }, [user.user])
  
  const generateList = () => {
    return <IonList color="none">
      { playlists.map(a => <IonItem key={a.dateCreated}>
          <IonButton slot="end" onClick={() => alert('TODO')}>
            View
          </IonButton>
          <IonLabel>
            <h2>{a.name}</h2>
            <h3>{new Date(a.dateCreated).toLocaleString('nl')}</h3>
          </IonLabel>
        </IonItem>)}
    </IonList>
  }

  const click = () => {
    redirect('/newplaylist')
  }

  return <IonPage>
    <IonContent>
      <div id="playlists" className="background">
        <div className="header width-90">
          <a href="/home" className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Back</span>
          </a>
        </div>
        <div id="playlists-content">
          <h1>
            My playlists
          </h1>
          <div id="btn">
            <IonButton onClick={click}>
              Add New
            </IonButton>
          </div>
        </div>
        <div id="playlists-list">
          { generateList() }
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default Playlists