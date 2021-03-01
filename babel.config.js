module.exports = {
	presets: [
		[
			'@babel/env',
			{
				useBuiltIns: 'usage',
				modules: false,
				corejs: {
					version: '3.9',
					proposals: true
				}
			}
		]
	],
	exclude: [/core-js/]
}
