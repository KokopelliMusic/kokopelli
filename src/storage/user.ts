import { Storage } from '@capacitor/storage'
import { database } from '../firebase'

export type Session = {
  sessionId: string
  playlistId: string
}

export type User = {
  username: string
  isGuest: boolean
  uid: string | undefined
}

export type AccountUser = User & {
  isGuest: false
}

export type GuestUser = User & {
  isGuest: true
  sessionId: string
}

export const initialUser: User = {
  username: 'undefined',
  isGuest: true,
  uid: undefined
}

/**
 * Initialize an account
 * @param user A AccountUser instance
 */
export const login = async (user: AccountUser): Promise<void> => {
  return getRef(user.uid!, 'user')
    .set(user)
}

/**
 * Initialize a guest account
 * @param user A GuestUser instance
 */
export const initGuest = async (user: GuestUser) => {
  return getRef(user.uid!, 'user')
    .set(user)
}

/**
 * Get the user that is currently logged in. Can be of type AccountUser of GuestUser
 */
export const getUser = async (uid: string): Promise<AccountUser | GuestUser> => {
  return await getRef(uid, 'user')
    .get()
    .then(snap => snap.val())
}

/**
 * Getter for the current session
 * @returns undefined if no session is set else a Session instance 
 */
export const getSession = (uid: string): Promise<Session> => {
  return getRef(uid, 'session')
    .get()
    .then(val => val.val())
}

export const setSession = ({ sessionId, playlistId }: Session, uid: string): Promise<void> => {
  return getRef(uid, 'session')
    .set( {
      sessionId,
      playlistId
    })
}

export const getRef = (uid: string, path: string) => {
  return database.ref(`/users/${uid}/${path}`)
}