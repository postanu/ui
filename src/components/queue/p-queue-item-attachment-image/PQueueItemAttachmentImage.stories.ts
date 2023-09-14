import type { Meta, StoryObj } from '@storybook/vue3'

import PQueueItemAttachmentImage from './PQueueItemAttachmentImage.vue'

type Story = StoryObj<typeof PQueueItemAttachmentImage>

export default {
	title: 'Queue / PQueueItemAttachmentImage',
	component: PQueueItemAttachmentImage,
	argTypes: {
		image: {
			control: 'text',
			description: 'Image URL'
		}
	}
} as Meta<typeof PQueueItemAttachmentImage>

export const Default: Story = {
	args: {
		image: 'mm.jpg'
	}
}
