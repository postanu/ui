import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PQueuePages from './PQueuePages.vue'
import { generatePages } from '../../generator'

export default {
	title: 'PQueue/PQueuePages',
	component: PQueuePages,
	argTypes: {
		pattern: {
			control: 'text'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PQueuePages },
	setup: () => ({
		args,
		pages: args.pattern
			? generatePages(JSON.parse(args.pattern))
			: args.pages
	}),
	template: '<p-queue-pages :pages="pages" />'
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
