module.exports = {
	stories: [
		'../components/**/*.stories.@(js|ts)'
	],
	addons: [
		'storybook-dark-mode',
		'@storybook/addon-links',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss')
				}
			}
		},
		'@storybook/addon-essentials'
	],
	core: {
		builder: 'storybook-builder-vite'
	}
}
