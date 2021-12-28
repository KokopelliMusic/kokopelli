import { Sipapu } from 'sipapu'

declare global {
    interface Window {
        sipapu: Sipapu
    }
}