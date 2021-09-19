export function usernameFromName (name: string): string {
	return name
		.replace(' ', '.')
		.replace(' ', '.')
		.toLowerCase()
}

export function randomInRange (min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

interface RandomFromArrayOptions<T> {
	copy?: boolean
	filter?: (item: T) => boolean
}

export function randomFromArray<T> (
	collection: T[],
	count = 1,
	options?: RandomFromArrayOptions<T>
): T | T[] {
	if (count === 1) {
		return collection[randomInRange(0, collection.length - 1)]
	} else {
		let copy = options?.copy || false
		let filter = options?.filter || ((): boolean => true)
		let items = copy ? [...collection] : collection
		let counter = count
		let collected = []
		while (counter !== 0) {
			let index = randomInRange(0, items.length - 1)
			let item = items[index]
			if (filter(item)) {
				collected.push(items[index])
				items.splice(index, 1)
				counter--
			}
		}
		return collected
	}
}
