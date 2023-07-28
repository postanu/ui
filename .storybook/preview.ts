import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'

import PIconInstagram from '../src/components/core/icons/p-icon-instagram/PIconInstagram.vue'
import PIconFacebook from '../src/components/core/icons/p-icon-facebook/PIconFacebook.vue'
import PIconTwitter from '../src/components/core/icons/p-icon-twitter/PIconTwitter.vue'
import PIconVK from '../src/components/core/icons/p-icon-vk/PIconVK.vue'

import './styles.sass'
import '../src/styles/index.sass'
import { viewports } from './viewports.js'

setup(app => {
	app.component('p-icon-instagram', PIconInstagram)
	app.component('p-icon-facebook', PIconFacebook)
	app.component('p-icon-twitter', PIconTwitter)
	app.component('p-icon-vk', PIconVK)
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
