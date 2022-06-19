import type { Story } from '@storybook/vue3'

import PIconTwitter from './PIconTwitter.vue'

export default {
	title: 'PIconTwitter',
	component: PIconTwitter
}

export const Default: Story = () => ({
	components: { PIconTwitter },
	template: '<p-icon-twitter />'
})
