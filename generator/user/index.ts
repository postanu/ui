import { members } from '../data/index.js'
import { randomInRange } from '../utils/index.js'

export interface GeneratedUser {
	name: string
	avatar: null | string
}

export function generateUsers (count: number): GeneratedUser[] {
	let users = [...members]
	return Array.from({ length: count }, () => {
		let index = randomInRange(0, users.length - 1)
		let user = { ...users[index] }
		users.splice(index, 1)
		return {
			name: user.name,
			avatar: user.avatar
		}
	})
}
