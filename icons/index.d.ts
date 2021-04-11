export type PIconsStorePath = {
	d: string
}

export type PIconsStore = {
	[key: string]: {
		height: number
		width: number
		path: PIconsStorePath | PIconsStorePath[]
	}
}

export let icons: PIconsStore
