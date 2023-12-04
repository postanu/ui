import type { Meta, StoryObj } from '@storybook/vue3'

import { generatePagesGroups } from '../../../../generator/index.js'
import PQueueItemPages from './PQueueItemPages.vue'

type Story = StoryObj<typeof PQueueItemPages>

export default {
	title: 'Queue / PQueueItemPages',
	component: PQueueItemPages
} as Meta<typeof PQueueItemPages>

const Template: Story = {
	render: args => ({
		components: { PQueueItemPages },
		setup: () => ({ args }),
		template: '<p-queue-item-pages :groups-list="args.groupsList" />'
	})
}

export const Single: Story = {
	...Template,
	args: {
		groupsList: generatePagesGroups([1])
	}
}

export const Solo: Story = {
	...Template,
	args: {
		groupsList: generatePagesGroups([1, 1, 1, 1, 1])
	}
}

export const HalfSolo: Story = {
	...Template,
	args: {
		groupsList: generatePagesGroups([1, 1, 0, 0])
	}
}

export const Hardcore: Story = {
	...Template,
	args: {
		groupsList: generatePagesGroups([0, 0, 0, 0, 0])
	}
}
