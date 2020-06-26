import { initializeApp } from 'firebase-admin'

initializeApp({
	storageBucket: 'cpp-pm.appspot.com'
})

export { default as api } from './api'
