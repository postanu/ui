import { nanoid } from 'nanoid'

import { lyrics } from '../data/index.js'
import { randomFromArray, randomInRange } from '../utils/index.js'

export function getRandomImage (): string {
	return `https://picsum.photos/200?random=${nanoid()}`
}

export function getRandomSentence (): string {
	return lyrics[randomInRange(0, lyrics.length - 1)]
}

export function getRandomTime (): string {
	// eslint-disable-next-line unicorn/consistent-function-scoping
	let format = (number: number): string => {
		if (number < 10) {
			return `0${number}`
		}
		return `${number}`
	}
	let h = format(randomInRange(1, 12))
	let m = format(randomInRange(0, 60))
	let a = randomFromArray(['AM', 'PM'])
	return `${h}:${m} ${a}`
}

export function getRandomNumber (max: number): number {
	return Math.floor(Math.random() * max)
}
