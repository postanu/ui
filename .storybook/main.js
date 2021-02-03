const path = require('path')

module.exports = {
  stories: [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
	],
	webpackFinal: async (config, { configType }) => {
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
