import { mergeConfig } from 'vite'

export default {
  staticDirs: ['../public'],
  stories: ['../components/**/*.stories.@(js|ts)'],
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
  /**
   * @param config {import('vite').UserConfig}
   */
  async viteFinal(config) {
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
