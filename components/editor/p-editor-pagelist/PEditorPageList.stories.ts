import type { Story } from '@storybook/vue3'

import { generatePages, randomFromArray } from '../../../generator/index.js'
import PEditorPageList from './PEditorPageList.vue'

export default {
	title: 'Editor / PEditorPageList',
	component: PEditorPageList,
	argTypes: {
		update: { action: true },
		connect: { action: true },
		'update:selected': { action: true }
	}
}

const Template: Story = args => ({
	components: { PEditorPageList },
	setup: () => ({ args }),
	template: `
		<p-editor-page-list
			:pages="args.pages"
			:selected="args.selected"
			@update="args.update"
			@connect="args.connect"
			@update:selected="args['update:selected']"
		/>
	`
})

export const NoPages = Template.bind({})
NoPages.args = { pages: [] }

export const Full = Template.bind({})
let pages = generatePages([[10], [3], [3], [3]], { updatables: 3 })
let selected = randomFromArray(pages, 3, {
	filter: item => item.status !== 200
})
Full.args = { pages, selected }
