import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import './YouTube.css'
import { youtubeApi } from '../../config.json'
import React, { useContext, useEffect, useState } from 'react'
import { addSong, SongType } from '../../storage/playlist'
import { AuthContext } from '../../context/FirebaseAuthContext'
import { getSession, getUser } from '../../storage/user'

const YouTube = () => {

  const [link, setLink] = useState('')
  const [video, setVideo] = useState(null)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('Username')
  const [playlist, setPlaylist] = useState('')
  
  const context = useContext(AuthContext)

  useEffect(() => {
    getSession(context.user!.uid)
      .then(user => {
        setPlaylist(user.playlistId)
      })

    getUser(context.user!.uid)
      .then(user => user.username)
      .then(username => {
        setUsername(username)
      })
  })

  const splitIdFromYoutubeLink = () => {
    // thx copilot
    const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    
    const match = link.match(regex)
    return (match&&match[7].length===11)? match[7] : false
  }

  const getYouTubeVideo = () => {
    const id = splitIdFromYoutubeLink()
    if (!id) {
      // schreeuw moord en brand
      setError('Link invalid')
      return false
    }

    fetch(youtubeApi + '?id=' + id)
      .then(res => res.json())
      .then(video => {
        setVideo(video)
        console.log(video)
      })
      .catch(err => {
        setError(err)
        console.error(err)
      })
  }

  const check = (event: any) => {
    setError('')
    getYouTubeVideo()
  }

  const onChange = (e: React.FormEvent<HTMLIonInputElement>) => {
    const val = e.currentTarget.value! as string
    setLink(val)

    if (!link || link === '') {
      setVideo(null)
      setError('')
    }
  }

  const addVideo = async () => {
    if (!video || video === null) {
      setError('No video')
    } else {
      await addSong(context.user!.uid, playlist, { 
        // @ts-expect-error
        title: video.title, 
        // @ts-expect-error
        artist: video.channel.title, 
        // @ts-expect-error
        id: video.id,
        uid: context.user!.uid,
        addedBy: username,
        type: SongType.YouTube
      }).then(() => {
        setLink('')
        setVideo(null)
        setError('')
      })
    }
  }

  const selectBestThumbnail = () => {
    // @ts-expect-error
    const thumbs = video!.raw.snippet.thumbnails
    const len = Object.keys(thumbs).length
    // @ts-expect-error
    return video!.raw.snippet.thumbnails[Object.keys(thumbs)[len - 1]].url
  }

  return <IonPage>
    <IonContent>
      <div className="background fullscreen">
        <div className="header width-90">
          <a href="/session" className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Back</span>
          </a>
        </div>

        <div className="center">
          <h2>Add a YouTube video</h2>
        
          <p>Enter a valid YouTube video link below.</p>
          <span>Search coming soon(TM)</span>
        </div>

        <br/>

        <div className="center">
          <IonInput
            type="text"
            className="width-90"
            autofocus
            clearInput
            enterkeyhint="search"
            placeholder="YouTube url"
            value={link}
            onPaste={onChange}
            onInput={onChange}
          />

        </div>
        <br/>
        {error || video ? <div className="center">
          {error ?
            <p className="error">{error}</p> : 
            <div className="center">
              {/* @ts-ignore */}
              <b>{video!.title}</b>
              {/* @ts-ignore */}
              <p>{video!.channel.title}</p>
              <div className="">
                {/* @ts-ignore */}
                <img src={selectBestThumbnail()} alt=""/>
              </div>

              <IonButton onClick={addVideo}>
                Add
              </IonButton>
            </div>
          }
          </div> : 
          <div className="center">
            <IonButton className="" onClick={check}>
              Check link
            </IonButton>
          </div>
          }
      </div>


    </IonContent>
  </IonPage>
      
}

export default YouTube