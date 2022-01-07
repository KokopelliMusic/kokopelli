import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { musicalNotes, barcode, pricetag, people } from 'ionicons/icons'
import { useState, useEffect } from 'react'
import { redirect } from '../../util'
import './SessionPage.css'
import { EventTypes, NextSongEventData } from 'sipapu/src/events'
import { PlaylistType } from 'sipapu/src/services/playlist'
import { SessionType } from 'sipapu/src/services/session'

const SessionPage = () => {

  const [songsLen, setSongsLen] = useState(0)
  const [userLen, setUserLen] = useState(0)
  const [songCover, setSongCover] = useState('https://cdn.nierot.com/memes/missing.jpg')
  const [songTitle, setSongTitle] = useState('Song title')
  const [songArtist, setSongArtist] = useState('Artist')
  const [username, setUsername] = useState('Username')
  const [playlist, setPlaylist] = useState<PlaylistType>()
  const [session, setSession] = useState<SessionType>()

  useEffect(() => {
    const fun = async () => {
      await window.sipapu.getUsername()
        .then(u => setUsername(u))
        .catch(err => {
          alert('Cannot find username. Please login again.')
          redirect('/login')
        })

      const session = await window.sipapu.Session.get(window.sipapu.Session.sessionId!)
      .catch(err => {
        alert('Session not found, returning to home. Error: ' + err.message)
        redirect('/')
      })

      if (session === undefined) {
        // TODO error handling
        alert('Session not found, returning to home')
        redirect('/')
      }

      setSession(session!)

      await window.sipapu.Playlist.get(session!.playlistId)
        .then(async playlist => {
          setPlaylist(playlist)
          setSongsLen(await window.sipapu.Playlist.getNumberOfSongs(playlist.id))
          setUserLen(await window.sipapu.Playlist.getNumberOfUsers(playlist.id))
        })
      
      window.sipapu.Session.watch(session!.id, event => {
        if (event.eventType === EventTypes.NEXT_SONG) {
          const data = event.data as NextSongEventData
          setSongCover(data.song.cover ?? 'https://cdn.nierot.com/memes/missing.jpg')
          setSongTitle(data.song.title)
          setSongArtist(data.song.artist ?? 'Artist')
        }
      })
      // const u = await getUser(uid)
      // setUser(u)
      // await getSession(uid)
      //   .then(async ses => {
      //     setSession(ses)
      //     setPlaylist(await getPlaylist(ses.playlistId!))

      //     await fetch(`${backend}/playlist/number-of-songs?playlistId=${ses.playlistId}`)
      //       .then(resp => resp.json())
      //       .then(resp => setSongsLen(resp.songs))

      //     if (playlist?.users) {
      //       setUserLen(Object.entries(playlist.users).length | 0)
      //     }

      //     cleanupSong = listenForCurrentSong(ses.sessionId, (title, artist, cover) => {
      //       setSongArtist(artist)
      //       setSongTitle(title)
      //       setSongCover(cover)
      //     })
      
      //   })

    }
    fun()
  }, [])


  // useEffect(() => {
  //   if (playlist?.users) {
  //     setUserLen(Object.entries(playlist.users).length | 0)
  //   }
  // }, [playlist])

  return <IonPage>
    <IonContent>
      <div className="background" id="session">
        {/* Filler */}
        <div />

        {/* Title */}
        <div className="center">
          <h1 className="text-center width-90">
            Welcome {username}
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
              <span className="uppercase">&nbsp;{session?.id}</span>
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