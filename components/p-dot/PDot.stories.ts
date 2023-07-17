import type { Meta, StoryObj } from '@storybook/vue3'

import PDot from './PDot.vue'

type Story = StoryObj<typeof PDot>

export default {
	title: 'PDot',
	component: PDot,
	argTypes: {
		state: {
			control: 'select',
			options: ['error', 'loading']
		}
	}
} as Meta<typeof PDot>

const Template: Story = {
	render: args => ({
		components: { PDot },
		setup: () => ({ args }),
		template: `
			<p-dot
				:state="args.state"
			/>
		`
	})
}

export const Loading: Story = {
	...Template,
	args: {
		state: 'loading'
	}
}
