export type PIconsStore = {
	[key: string]: {
		height: number
		width: number
		path: {
			d: string
		}
	}
}

export let icons: PIconsStore
