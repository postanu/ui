import type { Meta, StoryObj } from '@storybook/vue3'

import { generateAttachments, randomInRange } from '../../../generator/index.js'
import PQueueItemAttachments from './PQueueItemAttachments.vue'

type Story = StoryObj<typeof PQueueItemAttachments>

export default {
	title: 'Queue / PQueueItemAttachments',
	component: PQueueItemAttachments
} as Meta<typeof PQueueItemAttachments>

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
