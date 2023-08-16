import type { StorybookConfig } from '@storybook/vue3-vite'

import { mergeConfig } from 'vite'

const storybookConfig: StorybookConfig = {
	staticDirs: ['../src/public'],
	stories: ['../src/components/**/*.stories.ts'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: '@storybook/vue3-vite',
	core: {
		disableTelemetry: true
	},
	docs: {
		autodocs: false
	},
	async viteFinal (config) {
		return mergeConfig(config, {
			optimizeDeps: {
				// pre-bundle @postanu/ui dependencies to speed up development
				include: [
					'@postanu/core',
					'@postanu/twitter-text',
					'@postanu/twitter-text/regexp',
					'hashtag-regex',
					'vuedraggable',
					'date-fns',
					'nanoid'
				]
			}
		})
	}
}

export default storybookConfig
