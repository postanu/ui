import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3'

import PIconInstagram from '../components/icons/p-icon-instagram/PIconInstagram.vue'
import PIconFacebook from '../components/icons/p-icon-facebook/PIconFacebook.vue'
import PIconTwitter from '../components/icons/p-icon-twitter/PIconTwitter.vue'
import PIconVK from '../components/icons/p-icon-vk/PIconVK.vue'

import './styles.sass'
import '../styles/base.sass'
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
