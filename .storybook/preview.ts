import '../src/styles/index.sass'
import './styles.sass'

import type { Preview } from '@storybook/vue3'

import { setup } from '@storybook/vue3'

import PIconFacebook from '../src/components/core/icons/p-icon-facebook/PIconFacebook.vue'
import PIconInstagram from '../src/components/core/icons/p-icon-instagram/PIconInstagram.vue'
import PIconTwitter from '../src/components/core/icons/p-icon-twitter/PIconTwitter.vue'
import PIconVK from '../src/components/core/icons/p-icon-vk/PIconVK.vue'
import { viewports } from './viewports.js'

setup(app => {
	app.component('PIconInstagram', PIconInstagram)
	app.component('PIconFacebook', PIconFacebook)
	app.component('PIconTwitter', PIconTwitter)
	app.component('PIconVk', PIconVK)
})

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
