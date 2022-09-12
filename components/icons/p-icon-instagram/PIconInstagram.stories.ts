import type { Story } from '@storybook/vue3'

import PIconInstagram from './PIconInstagram.vue'

export default {
	title: 'Icons / PIconInstagram',
	component: PIconInstagram
}

export const Default: Story = () => ({
	components: { PIconInstagram },
	template: '<p-icon-instagram />'
})
