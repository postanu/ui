import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { generatePages } from '../../data'
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
Full.args = {
	pages: generatePages(10, 4, 3),
	selected: generatePages(2, 1)
}
