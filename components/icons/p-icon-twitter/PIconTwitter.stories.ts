import type { Story } from '@storybook/vue3'

import PIconTwitter from './PIconTwitter.vue'

export default {
	title: 'Icons / PIconTwitter',
	component: PIconTwitter
}

export const Default: Story = () => ({
	components: { PIconTwitter },
	template: '<p-icon-twitter />'
})
