export interface PIconsStorePath {
	d: string
}

export interface PIconsStore {
	[key: string]: {
		height: number
		width: number
		path: PIconsStorePath | PIconsStorePath[]
	}
}

export let icons: PIconsStore
