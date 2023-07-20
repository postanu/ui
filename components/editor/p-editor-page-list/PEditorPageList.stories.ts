import type { Meta, StoryObj } from '@storybook/vue3'

import { action } from '@storybook/addon-actions'

import { generatePages, randomFromArray } from '../../../generator/index.js'
import PEditorPageList from './PEditorPageList.vue'

type Story = StoryObj<typeof PEditorPageList>

export default {
	title: 'Editor / PEditorPageList',
	component: PEditorPageList
} as Meta<typeof PEditorPageList>

export const NoPages: Story = {
	render: args => ({
		components: { PEditorPageList },
		setup: () => ({ args }),
		template: `
			<p-editor-page-list
				:pages="args.pages"
				:selected="args.selected"
				@update="args.onUpdate"
				@connect="args.onConnect"
				@update:selected="args['onUpdate:selected']"
			/>
		`
	}),
	args: {
		pages: [],
		onUpdate: action('update'),
		onConnect: action('connect'),
		'onUpdate:selected': action('update:selected')
	}
}

export const Full: Story = {
	...NoPages,
	args: {
		...NoPages.args,
		pages: generatePages([[10], [3], [3], [3]], { updatables: 3 }),
		selected: randomFromArray(
			generatePages([[10], [3], [3], [3]], { updatables: 3 }), 3, {
				filter: item => item.status !== 200
			}
		)
	}
}
