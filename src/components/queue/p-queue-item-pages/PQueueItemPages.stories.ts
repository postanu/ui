import type { Meta, StoryObj } from '@storybook/vue3'

import { generatePages } from '../../../../generator/index.js'
import PQueueItemPages from './PQueueItemPages.vue'

type Story = StoryObj<typeof PQueueItemPages> & {
	args?: {
		pattern?: string
	}
}

export default {
	title: 'Queue / PQueueItemPages',
	component: PQueueItemPages,
	argTypes: {
		pattern: {
			control: 'text'
		}
	}
} as Meta<typeof PQueueItemPages>

const Template: Story = {
	render: args => ({
		components: { PQueueItemPages },
		setup: () => ({
			args,
			// TODO
			// @ts-ignore
			pages: args.pattern
				// @ts-ignore
				? generatePages(JSON.parse(args.pattern))
				: args.pages
		}),
		template: '<p-queue-item-pages :pages="pages" />'
	})
}

export const Single: Story = {
	...Template,
	args: {
		pages: generatePages([[1]])
	}
}

export const Solo: Story = {
	...Template,
	args: {
		pages: generatePages([[1], [1], [1], [1]])
	}
}

export const HalfSolo: Story = {
	...Template,
	args: {
		pages: generatePages([[1], [1], [0], [0]])
	}
}

export const Hardcore: Story = {
	...Template,
	args: {
		pattern: '[[0], [0], [0], [0]]'
	}
}
