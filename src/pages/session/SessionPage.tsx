import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { musicalNotes, barcode, pricetag, people, logoYoutube } from 'ionicons/icons'
import React, { useState, useEffect, useContext } from 'react'
import { redirect } from '../../util'
import {  getSession, getUser, Session, User } from '../../storage/user'
import { getPlaylist, listenForCurrentSong, Playlist } from '../../storage/playlist'
import './SessionPage.css'
import { backend } from '../../config.json'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { database } from '../../firebase'

const SessionPage = () => {

  const authContext = useContext(AuthContext)
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session>()
  const [playlist, setPlaylist] = useState<Playlist>()
  const [songsLen, setSongsLen] = useState(0)
  const [userLen, setUserLen] = useState(0)
  const [songCover, setSongCover] = useState('https://cdn.nierot.com/memes/missing.jpg')
  const [songTitle, setSongTitle] = useState('Song title')
  const [songArtist, setSongArtist] = useState('Artist')


  useEffect(() => {
    let cleanupSong: any

    const fun = async () => {
      const uid = authContext.user!.uid

      const u = await getUser(uid)
      setUser(u)
      await getSession(uid)
        .then(async ses => {
          setSession(ses)
          setPlaylist(await getPlaylist(ses.playlistId!))

          await fetch(`${backend}/playlist/number-of-songs?playlistId=${ses.playlistId}`)
            .then(resp => resp.json())
            .then(resp => setSongsLen(resp.songs))

          if (playlist?.users) {
            setUserLen(Object.entries(playlist.users).length | 0)
          }

          cleanupSong = listenForCurrentSong(ses.sessionId, (title, artist, cover) => {
            setSongArtist(artist)
            setSongTitle(title)
            setSongCover(cover)
          })
      
        })

    }
    fun()

    return () => {
      if (cleanupSong) cleanupSong.off()
    }

  }, [])


  useEffect(() => {
    if (playlist?.users) {
      setUserLen(Object.entries(playlist.users).length | 0)
    }
  }, [playlist])

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
            <img src={songCover} alt="Img"/>
          </div>
          <div id="artist">
            <span id="title">
              {songTitle} 
            </span>
            <span id="artist">
              {songArtist}
            </span>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>

}

export default SessionPage