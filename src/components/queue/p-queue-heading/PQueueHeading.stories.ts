import type { Meta, StoryObj } from '@storybook/vue3'

import PQueueHeading from './PQueueHeading.vue'

type Story = StoryObj<typeof PQueueHeading>

export default {
	title: 'Queue / PQueueHeading',
	component: PQueueHeading,
	argTypes: {
		size: {
			control: 'select',
			options: ['large', 'small']
		},
		title: {
			control: 'text'
		},
		subtitle: {
			control: 'text'
		}
	}
} as Meta<typeof PQueueHeading>

export const Large: Story = {
	args: {
		size: 'large',
		muted: false,
		title: 'Title',
		subtitle: 'Subtitle'
	}
}

export const Small: Story = {
	args: {
		size: 'small',
		muted: false,
		title: 'Title',
		subtitle: 'Subtitle'
	}
}
