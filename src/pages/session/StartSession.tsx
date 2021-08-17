import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, isPlatform } from '@ionic/react'
import { arrowBack, create } from 'ionicons/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router';
import { AuthContext } from '../../context/FirebaseAuthContext';
import { database } from '../../firebase';
import { SPOTIFY_CONFIG, webplayerUri, backend } from '../../config.json'
import './StartSession.css'
import { getQueryParam, redirect } from '../../util'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { setSession } from '../../storage/user'
import { getPlaylists } from '../../storage/playlist';

const StartSession = () => {

  const [stage, setStage] = useState(0)
  const [playlists, setPlaylists] = useState<Object[]>([])
  const [playlist, setPlaylist] = useState<string>('')
  const [spotify, setSpotify] = useState({ access: undefined, refresh: undefined, date: new Date() })
  const user = useContext(AuthContext)

  const next = () => {
    setStage(stage + 1)
  }

  const stages = [
    <LogIntoSpotify next={next} user={user} setSpotify={setSpotify}/>,
    <SelectPlaylist next={next} playlists={playlists} setPlaylist={setPlaylist}/>,
    <ConnectPlayer next={next} playlist={playlist} uid={user.user!.uid}/>,
    <Redirect to="/session" />
  ]

  useEffect(() => {
    (async () => {
      getPlaylists(user.user!.uid)
        .then(setPlaylists)
        .catch(err => {
          console.error(err)
          alert('Something went wrong, try reloading')
        })
    })()

  }, [user])


  return <IonPage>
    <IonContent>
      <div className="background stage">
        <div className="header width-90">
          <a href={'/home'} className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Cancel</span>
          </a>
        </div>
        { stages[stage] }
      </div>
    </IonContent>
  </IonPage>
}

const SelectPlaylist = ({ next, playlists, setPlaylist }: any) => {

  const click = (id: string) => {
    setPlaylist(id)
    next()
  }

  return <div id="select">
    <h1 className="text-center">
      Select a playlist to play
    </h1>
    <div>
      <IonList>
        { playlists.map((p: any) => <IonItem key={p.id}>
          <IonLabel>
            <h2>{p.name}</h2>
            <h3>{p.dateCreated}</h3>
          </IonLabel>
          <IonButton slot="end" onClick={() => click(p.id)}>
            Select
          </IonButton>
        </IonItem>)}
      </IonList>
    </div>
  </div>
}



const LogIntoSpotify = ({ next, setSpotify, user }: any) => {

  const [code, setCode] = useState('')

  useEffect(() => {
    if (getQueryParam('code')) {
      exchangeCodeForAccessToken(getQueryParam('code'))
        .then(() => next())
    }
  })

  if (getQueryParam('code') && !code) setCode(getQueryParam('code'))

  const openLink = () => {

    if (isPlatform('capacitor') || isPlatform('android') || isPlatform('cordova')) {
      
      const iab = InAppBrowser.create(createSpotifyLink(), '_self', {
        clearcache: 'yes',
        footer: 'no',
        hidenavigationbuttons: 'yes',
        zoom: 'no',
        hideurlbar: 'no'
      })

      iab.on('loadstop').subscribe(event => {
        if (event.url.startsWith(SPOTIFY_CONFIG.redirectUri)) {
          const urlParam = new URLSearchParams(new URL(event.url).search)
          const code = urlParam.get('code')!
          console.log(code)
          setCode(code)
          exchangeCodeForAccessToken(code)
            .then(() => {
              iab.close()
              next()
            })
        }
      })

    } else {
      redirect(createSpotifyLink())
    }

  }

  const createSpotifyLink = () => {
    return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CONFIG.clientId}&response_type=code&redirect_uri=${SPOTIFY_CONFIG.redirectUri}&scope=user-read-private%20streaming%20user-read-email`
  }

  const exchangeCodeForAccessToken = async (code: string) => {

    fetch(SPOTIFY_CONFIG.spotifyAuth + '/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        redirect_uri: SPOTIFY_CONFIG.redirectUri
      })
    })
    .then(data => data.json())
    .then(data => {

      if (!data) return

      data.dateSet = new Date()
      const spotify = {
        refresh: data.refresh_token,
        access: data.access_token,
        date: new Date()
      }

      database
        .ref(`users/${user.user?.uid}/spotify`)
        .set(spotify)
        .then(() => setSpotify(spotify))

    })  
    .catch(error => {
      alert('Error')
      console.error(error)
    })
  }

  // TODO
  // https://ionicframework.com/docs/native/in-app-browser/

  return <div id="login-spotify">
    <div>
      <h1 className="text-center">
        Login with Spotify
      </h1>

      <div className="center">
        <p id="text">
          Kokopelli requires a Spotify premium account to play music. 
          <br />
          <br />
          Please login with the button below to continue
        </p>
      </div>
    </div>
    <div className="center">
      <button id="spotify-button" onClick={() => openLink()}>
        <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g fill="#fff" fill-rule="nonzero">
            <path d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.44,0 8,0 Z M11.6806667,11.56 C11.5206667,11.7993333 11.2406667,11.88 11,11.72 C9.12,10.56 6.76,10.3193333 3.95933333,10.9593333 C3.68066667,11.0406667 3.44,10.84 3.36,10.6 C3.28,10.3193333 3.48,10.08 3.72,10 C6.76,9.31933333 9.4,9.6 11.48,10.88 C11.76,11 11.7993333,11.3193333 11.6806667,11.56 Z M12.6406667,9.36 C12.44,9.64 12.08,9.76 11.7993333,9.56 C9.64,8.24 6.36,7.84 3.84,8.64 C3.52066667,8.72 3.16,8.56 3.08,8.24 C3,7.92 3.16,7.55933333 3.48,7.47933333 C6.4,6.6 10,7.04066667 12.48,8.56 C12.7206667,8.68066667 12.84,9.08 12.6406667,9.36 Z M12.7206667,7.12 C10.16,5.6 5.88,5.44 3.44,6.20066667 C3.04,6.32 2.64,6.08 2.52,5.72 C2.4,5.31933333 2.64,4.92 3,4.79933333 C5.84,3.95933333 10.52,4.11933333 13.4806667,5.88 C13.84,6.08 13.96,6.56 13.76,6.92 C13.5606667,7.20066667 13.08,7.31933333 12.7206667,7.12 Z"></path>
          </g>
        </svg>
        <span>
          Login with Spotify
        </span>
      </button>
    </div>

  </div>
}

const ConnectPlayer = ({ next, playlist, uid }: any) => {

  const [otp1, setOtp1] = useState('')
  const [otp2, setOtp2] = useState('')
  const [otp3, setOtp3] = useState('')
  const [otp4, setOtp4] = useState('')
  const errorRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let code = otp1 + otp2 + otp3 + otp4
    if (otp4 !== '' && code.length === 4) {
      fetch(backend + `/session/claim?code=${code}&playlistId=${playlist}&uid=${uid}`)
        .then(resp => resp.json())
        .then(resp => {
          if (!resp.success && errorRef.current) {
            errorRef.current.innerText = 'Code does not exist'
          } else {
            setSession({
              sessionId: code,
              playlistId: playlist
            }, uid).then(() => redirect('/session'))
          }
        })
        .catch(err => {
          console.error(err)
          alert('Something went wrong. Please try reloading')
        })
      }
  }, [otp1, otp2, otp3, otp4, playlist, uid])

  const inputFocus = (e: any) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const next = e.target.tabIndex - 2

      if (next > -1) {
        e.target.form.elements[next].focus()
      }
    } else {
      const next = e.target.tabIndex
      if (next < 4) {
        e.target.form.elements[next].focus()
      }
    }
  }

  return <div id="connect" className="text-center">
    <h1>Connect</h1>
    <p>Now navigate to <span id="link">{webplayerUri}</span> on your tv and fill in the code below.</p>

    <p ref={errorRef} className="text-error"/>

    <div id="otp">
      <form>
        <OTPInputField name="1" value={otp1} setValue={setOtp1} inputFocus={inputFocus}/>
        <OTPInputField name="2" value={otp2} setValue={setOtp2} inputFocus={inputFocus}/>
        <OTPInputField name="3" value={otp3} setValue={setOtp3} inputFocus={inputFocus}/>
        <OTPInputField name="4" value={otp4} setValue={setOtp4} inputFocus={inputFocus}/>
      </form>
    </div>
  </div>
}

const OTPInputField = ({ name, value, setValue, inputFocus }: any) =>
<input 
  name={name}
  type="text"
  autoComplete="off"
  className="otp-input"
  value={value}
  onChange={e => setValue(e.target.value)}
  tabIndex={name}
  maxLength={1}
  onKeyUp={e => inputFocus(e)}
/>


export default StartSession