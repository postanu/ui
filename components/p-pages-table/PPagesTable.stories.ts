import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/vue3'

import { generatePages } from '../../generator/index.js'
import PPagesTable from './PPagesTable.vue'

type Story = StoryObj<typeof PPagesTable>

export default {
	title: 'PPagesTable',
	component: PPagesTable,
	argTypes: {
		pattern: {
			control: 'text'
		},
		pages: {
			control: 'text'
		}
	}
} as Meta<typeof PPagesTable>

const Template: Story = {
	render: args => ({
		inheritAttrs: false,
		components: { PPagesTable },
		setup: () => ({
			...args,
			pages: args.pages
				? JSON.parse(args.pages)
				: generatePages(JSON.parse(args.pattern))
		}),
		template: `
			<p-pages-table
				:pages="pages"
				:updatable="updatable"
				:removable="removable"
				@update="update"
				@remove="remove"
			/>
		`
	}),
	args: {
		update: action('update'),
		remove: action('remove')
	}
}

export const OnePage: Story = {
	...Template,
	args: {
		...Template.args,
		pages: JSON.stringify(generatePages([[1]]), null, '\t')
	}
}

export const MultiPage: Story = {
	...Template,
	args: {
		...Template.args,
		pages: JSON.stringify(generatePages([[0], [0], [0]]), null, '\t')
	}
}

export const Generative: Story = {
	...Template,
	args: {
		...Template.args,
		pattern: '[[0], [1], [3], [2]]'
	}
}
