import type { Meta, StoryObj } from '@storybook/vue3'

import PQueueHeading from './PQueueHeading.vue'

type Story = StoryObj<typeof PQueueHeading>

export default {
	title: 'Queue / PQueueHeading',
	component: PQueueHeading,
	argTypes: {
		date: {
			control: 'text'
		}
	}
} as Meta<typeof PQueueHeading>

export const Default: Story = {
	args: {
		date: new Date().toISOString().split('T')[0],
		muted: false
	}
}
