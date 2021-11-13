import { defineComponent } from 'vue'
import { Story, Meta } from '@storybook/vue3'

import PEditorText from './PEditorText.vue'

export default {
	title: 'PEditor/PEditorText',
	component: PEditorText,
	argTypes: {}
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorText },
	setup: () => ({ args }),
	template: '<p-editor-text/>'
})

export const Default = Template.bind({})
Default.args = {}
