import type { Story } from '@storybook/vue3'

import PButtonClose from './PButtonClose.vue'

export default {
	title: 'PButton/PButtonClose',
	component: PButtonClose,
	argTypes: {
		close: {
			action: true
		}
	}
}

const Template: Story = args => ({
	components: { PButtonClose },
	setup: () => ({ args }),
	template: `
		<p-button-close @close="args.close" />
	`
})

export const Default = Template.bind({})
