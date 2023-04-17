import type { Meta, StoryObj } from '@storybook/vue3'

import PQueueItemPages from './PQueueItemPages.vue'
import { generatePages } from '../../../generator/index.js'

type Story = StoryObj<typeof PQueueItemPages>

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
			pages: args.pattern
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
