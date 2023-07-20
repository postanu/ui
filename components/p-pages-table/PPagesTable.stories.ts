import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'

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
				// @ts-ignore
				? JSON.parse(args.pages)
				// @ts-ignore
				: generatePages(JSON.parse(args.pattern))
		}),
		template: `
			<p-pages-table
				:pages="pages"
				:updatable="updatable"
				:removable="removable"
				@update="onUpdate"
				@remove="onRemove"
			/>
		`
	}),
	args: {
		onUpdate: action('update'),
		onRemove: action('remove')
	}
}

export const OnePage: Story = {
	...Template,
	args: {
		...Template.args,
		// TODO
		// @ts-ignore
		pages: JSON.stringify(generatePages([[1]]), null, '\t')
	}
}

export const MultiPage: Story = {
	...Template,
	args: {
		...Template.args,
		// TODO
		// @ts-ignore
		pages: JSON.stringify(generatePages([[0], [0], [0]]), null, '\t')
	}
}

export const Generative: Story = {
	...Template,
	args: {
		...Template.args,
		// TODO
		// @ts-ignore
		pattern: '[[0], [1], [3], [2]]'
	}
}
