import { IonContent, IonPage } from '@ionic/react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { database } from '../../firebase'
import firebase from 'firebase'
import './Playlists.css'

const Playlists = () => {

  const [playlists, setPlaylists] = useState<any[]>([])
  const user = useContext(AuthContext)
  const playlistRef = database.ref(`users/${user.user?.uid}/playlists`)

  useEffect(() => {
    playlistRef
      .get()
      .then(snap => {
        let list: Object[] = []
        snap.forEach(p => { list.push(p.val()) })
        return list
      })
      .then(setPlaylists)
      .catch(err => {
        console.error(err)
        alert(err)
      })
  }, [])

  const createNewPlaylist = (name: string) => {
    let newList = playlistRef.push(name)

    newList.set({
      name,
      dateCreated: new Date().toISOString()
    })
  }

  const generateList = () => {
    return <div>
      { playlists.map(a => <div>
          <h1>{a.name}</h1>
          <h2>{a.dateCreated}</h2>
        </div>)}
    </div>
  }

  return <IonPage>
    <IonContent>
      { generateList() }
    </IonContent>
  </IonPage>
}

export default Playlists