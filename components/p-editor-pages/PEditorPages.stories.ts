import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import { generatePages } from '../../data'
import PEditorPages from './PEditorPages.vue'

export default {
	title: 'PEditor/PEditorPages',
	component: PEditorPages,
	argTypes: {}
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorPages },
	setup: () => ({
		pages: args.pages
	}),
	template: '<p-editor-pages :pages="pages"/>'
})

export const NoPages = Template.bind({})
NoPages.args = { pages: [] }

export const Test = Template.bind({})
Test.args = { pages: generatePages(10, 4) }
