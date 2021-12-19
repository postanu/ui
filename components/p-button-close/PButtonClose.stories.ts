import { defineComponent } from 'vue'
import type { Meta, Story } from '@storybook/vue3'

import PButtonClose from './PButtonClose.vue'

export default {
	title: 'PButton/PButtonClose',
	component: PButtonClose,
	argTypes: {
		close: {
			action: true
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PButtonClose },
	setup: () => ({ args }),
	template: `
		<p-button-close @close="args.close" />
	`
})

export const Default = Template.bind({})
