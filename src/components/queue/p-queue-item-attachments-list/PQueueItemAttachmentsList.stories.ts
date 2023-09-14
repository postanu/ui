import type { Meta, StoryObj } from '@storybook/vue3'

import { generateAttachments, randomInRange } from '../../../../generator/index.js'
import PQueueItemAttachmentsList from './PQueueItemAttachmentsList.vue'

type Story = StoryObj<typeof PQueueItemAttachmentsList>

export default {
	title: 'Queue / PQueueItemAttachmentsList',
	component: PQueueItemAttachmentsList
} as Meta<typeof PQueueItemAttachmentsList>

export const One: Story = {
	args: {
		items: generateAttachments(1)
	}
}

export const Four: Story = {
	args: {
		items: generateAttachments(4)
	}
}

export const More: Story = {
	args: {
		items: generateAttachments(randomInRange(5, 12))
	}
}
