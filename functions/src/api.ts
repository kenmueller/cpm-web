import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

import { hashString } from './utils'

const firestore = admin.firestore()
const app = express()

export default functions.https.onRequest(app)

app.use(cors())

app.post('/api/auth', async ({ body }, res) => {
	try {
		if (!(
			typeof body === 'object' &&
			typeof body.email === 'string' &&
			typeof body.password === 'string'
		)) {
			res.sendStatus(400)
			return
		}
		
		const { email, password } = body as {
			email: string
			password: string
		}
		
		const passwordHash = hashString(password)
		
		const { docs } = await firestore
			.collection('users')
			.where('email', '==', email)
			.limit(1)
			.get()
		
		const user = docs[0]
		
		if (!user) {
			const { id: uid } = await firestore
				.collection('users')
				.add({ email, password: passwordHash })
			
			res.json({ uid, password: passwordHash })
			return
		}
		
		if (user.get('password') === passwordHash) {
			res.json({ uid: user.id, password: passwordHash })
			return
		}
		
		res.status(403).send('Incorrect password')
	} catch (error) {
		res.status(500).json(error)
	}
})
