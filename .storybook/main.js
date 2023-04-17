module.exports = {
  staticDirs: ['../public'],
  stories: ['../components/**/*.stories.@(js|ts)'],
  addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
	docs: {
    autodocs: false
  },
  /**
   * @param config {import('vite').UserConfig}
   */
  async viteFinal(config) {
    // https://github.com/eirslett/storybook-builder-vite/issues/50
    config.resolve.dedupe = ['@storybook/client-api'];

    // pre-bundle @postanu/ui dependencies to speed up development
    if (config.optimizeDeps) {
      config.optimizeDeps.include.push('@postanu/core', '@postanu/twitter-text', '@postanu/twitter-text/regexp', 'hashtag-regex', 'vuedraggable', 'date-fns', 'nanoid');
    }
    return config;
  }
};
