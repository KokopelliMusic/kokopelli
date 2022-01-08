import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import { useState, useEffect } from 'react'
import './Playlists.css'
import { arrowBack } from 'ionicons/icons'
import { redirect } from '../../util'
import { PlaylistType } from 'sipapu/src/services/playlist'

const Playlists = () => {

  const [playlists, setPlaylists] = useState<PlaylistType[]>([])

  useEffect(() => {
    (async () => {
      const playlists = await window.sipapu.Playlist.getAllFromUser()
      setPlaylists(playlists)
    })()
  }, [])

  const parseDate = (date: Date) => `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
  
  const generateList = () => {
    return <IonList color="none">
      { playlists.map(a => <IonItem key={parseDate(a.createdAt)}>
          <IonButton slot="end" onClick={() => alert('TODO')}>
            View
          </IonButton>
          <IonLabel>
            <h2>{a.name}</h2>
            <h3>{parseDate(a.createdAt)}</h3>
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