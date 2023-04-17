import type { Meta, StoryObj } from '@storybook/vue3'

import PQueueHeading from './PQueueHeading.vue'

type Story = StoryObj<typeof PQueueHeading>

export default {
	title: 'Queue / PQueueHeading',
	component: PQueueHeading,
	argTypes: {
		date: {
			control: 'date'
		}
	}
} as Meta<typeof PQueueHeading>

export const Default: Story = {
	args: {
		date: Date.now()
	}
}
