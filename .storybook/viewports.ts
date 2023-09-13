import type { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export const viewports: typeof INITIAL_VIEWPORTS = {
	b1366: {
		name: 'Breakpoint < 1366px',
		type: 'tablet',
		styles: {
			width: '1365px',
			height: '100%'
		}
	},
	b800: {
		name: 'Breakpoint < 800px',
		type: 'mobile',
		styles: {
			width: '799px',
			height: '100%'
		}
	},
	m320: {
		name: '320×568, iPhone SE',
		type: 'mobile',
		styles: {
			width: '320px',
			height: '568px'
		}
	},
	m375: {
		name: '375×667, iPhone 8',
		type: 'mobile',
		styles: {
			width: '375px',
			height: '667px'
		}
	},
	m390: {
		name: '390×844, iPhone 13 / 14',
		type: 'mobile',
		styles: {
			width: '390px',
			height: '844px'
		}
	},
	m430: {
		name: '430×932, iPhone Pro',
		type: 'mobile',
		styles: {
			width: '430px',
			height: '932px'
		}
	},
	t744: {
		name: '744×1133, iPad Mini 8.3"',
		type: 'tablet',
		styles: {
			width: '744px',
			height: '1133px'
		}
	},
	t834: {
		name: '834×1194, iPad Pro 11"',
		type: 'tablet',
		styles: {
			width: '834px',
			height: '1194px'
		}
	},
	t1024: {
		name: '1024×1366, iPad Pro 12"',
		type: 'tablet',
		styles: {
			width: '1024px',
			height: '1366px'
		}
	},
	t1440: {
		name: '1440×960, Surface Pro 8',
		type: 'tablet',
		styles: {
			width: '1440px',
			height: '960px'
		}
	},
	d1280: {
		name: '1280×832, MacBook Air',
		type: 'desktop',
		styles: {
			width: '1280px',
			height: '832px'
		}
	},
	d1440: {
		name: '1440×1034, Desktop',
		type: 'desktop',
		styles: {
			width: '1440px',
			height: '1034px'
		}
	},
	d1512: {
		name: '1512×982, MacBook Pro 14"',
		type: 'desktop',
		styles: {
			width: '1512px',
			height: '982px'
		}
	},
	d1728: {
		name: '1728×1117, MacBook Pro 16"',
		type: 'desktop',
		styles: {
			width: '1728px',
			height: '1117px'
		}
	},
	d2048: {
		name: '2048×1240, MacBook Pro 16" (scaled)',
		type: 'desktop',
		styles: {
			width: '2048px',
			height: '1240px'
		}
	}
}
