import { defineComponent } from 'vue'
import type { Story } from '@storybook/vue3'

import PQueueItemPages from './PQueueItemPages.vue'
import { generatePages } from '../../../generator/index.js'

export default {
	title: 'Queue / PQueueItemPages',
	component: PQueueItemPages,
	argTypes: {
		pattern: {
			control: 'text'
		}
	}
}

const Template: Story = args => defineComponent({
	components: { PQueueItemPages },
	setup: () => ({
		args,
		pages: args.pattern
			? generatePages(JSON.parse(args.pattern))
			: args.pages
	}),
	template: '<p-queue-item-pages :pages="pages" />'
})

export const Solo = Template.bind({})
Solo.args = {
	pages: generatePages([[1], [1], [1], [1]])
}

export const HalfSolo = Template.bind({})
HalfSolo.args = {
	pages: generatePages([[1], [1], [0], [0]])
}

export const Hardcore = Template.bind({})
Hardcore.args = {
	pattern: '[[0], [0], [0], [0]]'
}
