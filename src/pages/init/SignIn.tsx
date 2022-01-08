import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useState } from 'react'
import { redirect } from '../../util'
import './SignIn.css'

const SignIn: React.FC = () => {
  useState()

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  let email = ''
  let password = ''

  const setEmail = (e: string) => email = e
  const setPassword = (e: string) => password = e

  const login = async () => {
    if (email.length === 0 || password.length === 0) {
      return alert('Please fill in both forms')
    }
    await window.sipapu.signIn(email, password)
      .then(() => redirect('/home'))
      .catch((err: Error) => alert(err.message))
  }

  return <IonPage>
    <IonContent>
      <div className="background" id="register">
        <div className="header width-90">
          <a href="/init" className="back">
            <IonIcon icon={arrowBack} className="back-icon"/>
            <span>Back</span>
          </a>
        </div>
        
        <h1 className="title center">
          Login
        </h1>

        <div className="center">          
          <IonInput 
            className="width-90"
            value={email}
            autofocus
            clearInput
            placeholder="Email" 
            autocomplete="email"
            onIonChange={e => setEmail(e.detail.value!)} />
          <IonInput 
            className="width-90"
            value={password}
            placeholder="Password"
            type="password"
            clearInput
            onIonChange={e => setPassword(e.detail.value!)} />
        </div>
        <div className="center">
          <IonButton className="width-90" onClick={login}>Login</IonButton>
        </div>

        <div className="center">
          <span className="text-center">
            By logging in, you agree to our&nbsp;
            <a href="https://cdn.nierot.com/memes/trollface.png">Terms of Use</a> and&nbsp; 
            <a href="https://cdn.nierot.com/memes/trollface.png">Privacy Policy</a>
          </span>
        </div>
      </div>
    </IonContent>
  </IonPage>
}

export default SignIn