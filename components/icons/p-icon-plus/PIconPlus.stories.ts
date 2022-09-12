import type { Story } from '@storybook/vue3'

import PIconPlus from './PIconPlus.vue'

export default {
	title: 'Icons / PIconPlus',
	component: PIconPlus
}

export const Default: Story = () => ({
	components: { PIconPlus },
	template: '<p-icon-plus />'
})
