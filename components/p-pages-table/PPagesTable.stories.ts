import type { Story } from '@storybook/vue3'

import { generatePages } from '../../generator'
import PPagesTable from './PPagesTable.vue'

export default {
	title: 'PPagesTable',
	component: PPagesTable,
	argTypes: {
		pattern: {
			control: 'text',
			description: 'Pattern to generate pages'
		},
		updatable: {
			control: 'boolean',
			description: 'Show `Update` button for each page.'
		},
		removable: {
			control: 'boolean',
			description: 'Show `Remove` button for each page.'
		},
		pages: {
			control: 'text',
			description: 'Pages object in JSON'
		},
		update: {
			action: true,
			description: 'Triggers on clicking the `Update` button and passes the page id.'
		},
		remove: {
			action: true,
			description: 'Triggers on clicking the `Remove` button and passes the page id.'
		}
	}
}

const Template: Story = args => ({
	components: { PPagesTable },
	setup: (): object => {
		return {
			args,
			pages: args.pages
				? JSON.parse(args.pages)
				: generatePages(JSON.parse(args.pattern))
		}
	},
	template: `
		<p-pages-table
			:pages="pages"
			:updatable="args.updatable"
			:removable="args.removable"
			@update="args.update"
			@remove="args.remove"
		/>
	`
})

export const OnePage = Template.bind({})
OnePage.args = {
	pages: JSON.stringify(generatePages([[1]]), null, '\t')
}

export const MultiPage = Template.bind({})
MultiPage.args = {
	pages: JSON.stringify(generatePages([[0], [0], [0]]), null, '\t')
}

export const Generative = Template.bind({})
Generative.args = {
	pattern: '[[0], [1], [3], [2]]'
}
