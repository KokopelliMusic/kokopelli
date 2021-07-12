import { Storage } from '@capacitor/storage'

export type Session = {
  sessionId: string
  playlistName: string
}

export type User = Session & {
  username: string
  initialized: boolean
  isGuest: boolean
}

export type AccountUser = User & {
  apiKey: string
  isGuest: false
}

export type GuestUser = User & {
  isGuest: true
}

export const initialUser: User = {
  username: 'undefined',
  initialized: false,
  sessionId: 'undefined',
  playlistName: 'undefined',
  isGuest: true
}

/**
 * Initialize an account
 * @param user A AccountUser instance
 */
export const login = async (user: AccountUser) => {
  await Storage.set({
    key: 'user',
    value: JSON.stringify(user)
  })
}

/**
 * Initialize a guest account
 * @param user A GuestUser instance
 */
export const initGuest = async (user: GuestUser) => {
  await Storage.set({
    key: 'user',
    value: JSON.stringify(user)
  })
}

/**
 * Get the user that is currently logged in. Can be of type AccountUser of GuestUser
 */
export const getUser = async (): Promise<AccountUser | GuestUser> => {
  return await Storage
    .get({ key: 'user' })
    .then(({ value }) => value != null ? JSON.parse(value) : initialUser)
}

/**
 * Getter for the current session
 * @returns undefined if no session is set else a Session instance 
 */
export const getSession = async (): Promise<Session | undefined> => {
  return await Storage
    .get({ key: 'user' })
    .then(({ value }) => value != null ? JSON.parse(value) : null)
    .then(session => session == null ? undefined : (session as Session))
}

export const setSession = async ({ sessionId, playlistName }: Session) => {
  const user = await getUser()
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      ...user,
      sessionId,
      playlistName
    })
  })
}