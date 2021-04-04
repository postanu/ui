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
		builder: 'webpack4'
	},
	webpackFinal: async config => {
		config.module.rules.push(
			{
				test: /\.pug$/,
				use: ['pug-plain-loader']
			},
			{
				test: /\.(stylus|styl)$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			}
		)
		return config
	}
}
