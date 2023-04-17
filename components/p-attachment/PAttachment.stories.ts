import type { Meta, StoryObj } from '@storybook/vue3'

import PAttachment from './PAttachment.vue'

type Story = StoryObj<typeof PAttachment>

export default {
	title: 'PAttachment',
	component: PAttachment,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL'
		}
	}
} as Meta<typeof PAttachment>

export const Default: Story = {
	args: {
		image: 'mm.jpg'
	}
}
