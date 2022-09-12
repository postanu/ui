import type { Story } from '@storybook/vue3'

import PIconVK from './PIconVK.vue'

export default {
	title: 'Icons / PIconVK',
	component: PIconVK
}

export const Default: Story = () => ({
	components: { PIconVK },
	template: '<p-icon-vk />'
})
