import '../src/styles/index.sass'
import './styles.sass'

import type { Preview } from '@storybook/vue3'

import { viewports } from './viewports.js'

// setup(app => {})

const preview: Preview = {
	parameters: {
		backgrounds: {
			disable: true,
			grid: {
				cellSize: 10,
				opacity: 0.15,
				offsetX: 20,
				offsetY: 20
			}
		},
		viewport: {
			viewports
		}
	}
}

export default preview
