export function usernameFromName (name: string): string {
	return name
		.replace(' ', '.')
		.replace(' ', '.')
		.toLowerCase()
}

export function randomInRange (min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
