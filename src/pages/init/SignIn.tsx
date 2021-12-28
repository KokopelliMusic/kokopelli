import { IonButton, IonContent, IonIcon, IonInput, IonPage } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useState } from 'react'
import { redirect } from '../../util'
import './SignIn.css'

const SignIn: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const register = async () => {
    if (email.length === 0 || password.length === 0) {
      return alert('Please fill in both forms')
    }
    try {
      await window.sipapu.signIn(email, password)
    } catch (error: any) {
      //TODO
      alert(error.message)
    } finally {
      redirect('/home')
    }
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
          <IonInput 
            className="width-90"
            value={username}
            clearInput
            placeholder="Username"
            onIonChange={e => setUsername(e.detail.value!)} />
        </div>
        <div className="center">
          <IonButton className="width-90" onClick={register}>Login</IonButton>
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