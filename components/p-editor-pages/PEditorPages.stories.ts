import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import { generatePages, randomFromArray } from '../../generator'
import PEditorPages from './PEditorPages.vue'

export default {
	title: 'PEditor/PEditorPages',
	component: PEditorPages,
	argTypes: {
		update: { action: true },
		connect: { action: true },
		'update:selected': { action: true }
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorPages },
	setup: () => ({ args }),
	template: `
		<p-editor-pages
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
