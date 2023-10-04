import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'

import { generatePages } from '../../../../generator/index.js'
import PPagesTable from './PPagesTable.vue'

type Story = StoryObj<typeof PPagesTable>

export default {
	title: 'PPagesTable',
	component: PPagesTable
} as Meta<typeof PPagesTable>

const Template: Story = {
	render: args => ({
		components: { PPagesTable },
		setup: () => ({ args }),
		template: `
			<p-pages-table
				:pages="args.pages"
				:updatable="args.updatable"
				:removable="args.removable"
				@update="args.onUpdate"
				@remove="args.onRemove"
			/>
		`
	}),
	args: {
		updatable: true,
		removable: true,
		onUpdate: action('update'),
		onRemove: action('remove')
	}
}

export const OnePage: Story = {
	...Template,
	args: {
		...Template.args,
		pages: generatePages([[1]])
	}
}

export const MultiPage: Story = {
	...Template,
	args: {
		...Template.args,
		pages: generatePages([[0], [0], [0]])
	}
}
