import { defineComponent } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import PEditorText from './PEditorText.vue'

export default {
	title: 'PEditor/PEditorText',
	component: PEditorText
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorText },
	setup: () => ({ args }),
	template: '<p-editor-text :text="args.text"/>'
})

export const Empty = Template.bind({})
Empty.args = {}

export const Filled = Template.bind({})
Filled.args = {
	text: 'I need a new leader, we need a new Luden'
}
