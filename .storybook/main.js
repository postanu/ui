const path = require('path')

module.exports = {
  stories: [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|ts)"
  ],
  addons: [
    "@storybook/addon-links",
		"@storybook/addon-postcss",
    "@storybook/addon-essentials"
	],
	core: {
    builder: 'webpack4',
  },
	webpackFinal: async config => {
		config.module.rules.push({
      test: /\.pug$/,
			use: ['pug-plain-loader']
		})
		config.module.rules.push({
      test: /\.stylus$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'stylus-loader',
					options: {
						stylusOptions: {
							use: ["nib"],
							import: ["nib", path.join(__dirname, "../styles/base")]
						}
					}
				}
			]
		})
		return config
	}
}
