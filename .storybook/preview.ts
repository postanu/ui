import { Parameters } from '@storybook/vue3'

import './styles.styl'
import '../styles/base.styl'
import { viewports } from './viewports'

export const parameters: Parameters = {
	backgrounds: {
		disable: true,
		grid: {
			cellSize: 10,
			opacity: 0.15,
			offsetX: 20,
			offsetY: 20
		}
	},
	viewport: { viewports },
	actions: { argTypesRegex: '^on[A-Z].*' }
}
