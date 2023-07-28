import type { Meta, StoryObj } from '@storybook/vue3'

import PAvatar from './PAvatar.vue'

type Story = StoryObj<typeof PAvatar>

export default {
	title: 'PAvatar',
	component: PAvatar,
	argTypes: {
		image: {
			control: 'text'
		}
	}
} as Meta<typeof PAvatar>

export const Image: Story = {
	args: {
		image: 'mm.jpg',
		text: 'Marilyn'
	}
}

export const Letter: Story = {
	args: {
		text: 'Marilyn'
	}
}
