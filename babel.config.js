module.exports = {
	presets: [
		[
			'@babel/env',
			{
				useBuiltIns: 'usage',
				modules: false,
				corejs: {
					version: '3.8',
					proposals: true
				}
			}
		]
	],
	exclude: [/core-js/]
}
