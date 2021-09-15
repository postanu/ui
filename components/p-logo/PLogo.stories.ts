import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PLogo from './PLogo.vue'

export default {
	title: 'PLogo',
	component: PLogo
} as Meta

export const Default: Story = () => defineComponent({
	components: { PLogo },
	template: '<p-logo/>'
})
