import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { musicalNotes, barcode, pricetag, people, logoYoutube } from 'ionicons/icons'
import React, { useState, useEffect, useContext } from 'react'
import { redirect } from '../../util'
import {  getSession, getUser, Session, User } from '../../storage/user'
import { getPlaylist, Playlist } from '../../storage/playlist'
import './SessionPage.css'
import { AuthContext } from '../../context/FirebaseAuthContext'

const SessionPage = () => {

  const authContext = useContext(AuthContext)
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session>()
  const [playlist, setPlaylist] = useState<Playlist>()
  const [songsLen, setSongsLen] = useState(0)
  const [userLen, setUserLen] = useState(0)

  useEffect(() => {
    const uid = authContext.user!.uid
    getUser(uid).then(setUser)
    getSession(uid)
      .then(setSession)
      .then(() => {
        getPlaylist(session?.playlistId!)
          .then(setPlaylist)
      })
      .then(() => {
        if (playlist?.songs) {
          setSongsLen(Object.entries(playlist.songs).length | 0)
        }
        if (playlist?.users) {
          setUserLen(Object.entries(playlist.users).length | 0)
        }
      })
  }, [authContext.user, session ,playlist?.songs, playlist?.users])

  const currentSong = 'https://cdn.nierot.com/memes/missing.jpg'
  const songTitle = 'Song title'
  const artist = 'Artist'

  return <IonPage>
    <IonContent>
      <div className="background" id="session">
        {/* Filler */}
        <div />

        {/* Title */}
        <div className="center">
          <h1 className="text-center width-90">
            Welcome {user?.username}
          </h1>
        </div>

        {/* Simple information about playlist */}
        <div className="center">
          <div className="connection">
            <h4>
              <IonIcon icon={pricetag} />
              &nbsp;{playlist?.name}
            </h4>
            {/* Playlist code*/}
            <h4>
              <IonIcon icon={barcode} />
              <span className="uppercase">&nbsp;{session?.sessionId}</span>
            </h4>
            <h4>
              <IonIcon icon={musicalNotes} />
              &nbsp;{songsLen} songs
            </h4>
            <h4>
              <IonIcon icon={people} />
              &nbsp;{userLen} users
            </h4>
          </div>
        </div>

        <div className="center">
          Add a song to this playlist
        </div>

        <div className="buttons">
          <div className="center">
            <button className="platform-button spotify white" onClick={() => redirect('/add/spotify')}>
              <img id="spotify-icon" src="https://cdn.nierot.com/-/spotify.svg" alt="logo"/>
              &nbsp;Spotify
            </button>
          </div>

          <div className="center">
            <button className="platform-button youtube white" onClick={() => redirect('/add/youtube')}>
              <img id="youtube-icon" src="https://cdn.nierot.com/-/youtube.svg" alt="logo"/>
              &nbsp;YouTube
            </button>
          </div>

          <div className="center">
            <button className="platform-button primary white" onClick={() => redirect('/add/mp3')}>
              <img id="mp3-icon" src="https://cdn.nierot.com/-/mp3.svg" alt="logo"/>
              &nbsp;MP3
            </button>
          </div>
        </div>

        <div />

        <div id="player">
          <div className="center">
            <img src={currentSong} alt="Img"/>
          </div>
          <div id="artist">
            <span id="title">
              {songTitle} 
            </span>
            <span id="artist">
              {artist}
            </span>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>

}

export default SessionPage