import { ViewportMap } from '@storybook/addon-viewport/dist/ts3.9/models/Viewport'

export const viewports: ViewportMap = {
	w320: {
		name: 'w320, SE',
		type: 'mobile',
		styles: {
			width: '320px',
			height: '568px'
		}
	},
	w375: {
		name: 'w375, Xs',
		type: 'mobile',
		styles: {
			width: '375px',
			height: '812px'
		}
	},
	w414: {
		name: 'w414, Pro',
		type: 'mobile',
		styles: {
			width: '414px',
			height: '896px'
		}
	},
	w1440: {
		name: 'w1440',
		type: 'mobile',
		styles: {
			width: '1440px',
			height: '1024px'
		}
	},
	w1680: {
		name: 'w1680, 13"',
		type: 'mobile',
		styles: {
			width: '1680px',
			height: '1050px'
		}
	}
}
