import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { generatePages } from '../../data'
import PPagesTable from './PPagesTable.vue'

export default {
	title: 'PPagesTable',
	component: PPagesTable,
	argTypes: {
		count: {
			control: 'number',
			description: 'Property of generative view'
		},
		networks: {
			control: 'number',
			description: 'Property of generative view'
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
} as Meta

const Template: Story = args => defineComponent({
	components: { PPagesTable },
	setup: () => {
		return {
			args,
			pages: args.pages
				? JSON.parse(args.pages)
				: generatePages(args.count, args.networks)
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
	pages: JSON.stringify(generatePages(1), null, '\t')
}

export const MultiPage = Template.bind({})
MultiPage.args = {
	pages: JSON.stringify(generatePages(10, 3), null, '\t')
}

export const Generative = Template.bind({})
Generative.args = {
	networks: 4,
	count: 13
}
