import { defineComponent } from 'vue'
import type { Story } from '@storybook/vue3'

import PLogo from './PLogo.vue'

export default {
	title: 'PLogo',
	component: PLogo
}

export const Default: Story = () => defineComponent({
	components: { PLogo },
	template: '<p-logo/>'
})
