import type { Story } from '@storybook/vue3'

import PIconClose from './PIconClose.vue'

export default {
	title: 'PIconClose',
	component: PIconClose
}

export const Default: Story = () => ({
	components: { PIconClose },
	template: '<p-icon-close />'
})
