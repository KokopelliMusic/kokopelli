import { IonButton, IonContent, IonInput, IonPage } from '@ionic/react'
import { FirebaseAuthConsumer } from '@react-firebase/auth'
import './Register.css'
import firebase from '../../firebase'
import { useState } from 'react'
import { redirect } from '../../util'

const Register: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = () => {
    if (email.length === 0 || password.length === 0) {
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        redirect('/session')
      })
      .catch(err => {
        alert(err)
        console.error(err)
      })
  }

  return <IonPage>
      <IonContent>
        <IonInput value={email} placeholder="email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
        <IonInput value={password} placeholder="password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>    
        <IonButton onClick={register}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
}

export default Register