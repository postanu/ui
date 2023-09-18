import '../src/styles/index.sass'
import './styles.sass'

import type { Preview } from '@storybook/vue3'

import { setup } from '@storybook/vue3'

import {
	PIconFacebook,
	PIconInstagram,
	PIconLinkedIn,
	PIconPinterest,
	PIconTelegram,
	PIconThreads,
	PIconTwitter,
	PIconVK,
	PIconYouTube
} from '../src/components/core/index.js'
import { viewports } from './viewports.js'

setup(app => {
	app.component('PIconFacebook', PIconFacebook)
	app.component('PIconInstagram', PIconInstagram)
	app.component('PIconLinkedin', PIconLinkedIn)
	app.component('PIconPinterest', PIconPinterest)
	app.component('PIconTelegram', PIconTelegram)
	app.component('PIconThreads', PIconThreads)
	app.component('PIconTwitter', PIconTwitter)
	app.component('PIconVk', PIconVK)
	app.component('PIconYoutube', PIconYouTube)
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
