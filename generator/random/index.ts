import { nanoid } from 'nanoid'

export function getRandomImage (): string {
	return `https://picsum.photos/200?random=${nanoid()}`
}
