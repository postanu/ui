const path = require('path')
const { searchForWorkspaceRoot } = require('vite')

module.exports = {
	staticDirs: ['../public'],
	stories: [
		'../components/**/*.stories.@(js|ts)'
	],
	addons: [
		'storybook-dark-mode',
		'@storybook/addon-links',
		'@storybook/addon-essentials'
	],
	core: {
		builder: 'storybook-builder-vite'
	},
	async viteFinal (config) {
		// https://github.com/eirslett/storybook-builder-vite/pull/92
		// https://github.com/eirslett/storybook-builder-vite/issues/55
		config.root = path.dirname(require.resolve('storybook-builder-vite'))
		if (config.server) {
			config.server.fsServe = undefined
		}

		// https://github.com/eirslett/storybook-builder-vite/issues/50
		config.resolve.dedupe = ['@storybook/client-api']

		if (config.server) {
			config.server.fs.allow = [searchForWorkspaceRoot(process.cwd())]
		}

		return config
	}
}
