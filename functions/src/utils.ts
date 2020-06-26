import { createHash } from 'crypto'

export const hashString = (data: string) =>
	createHash('md5').update(data).digest('hex')
