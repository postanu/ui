import { defineComponent, ref } from 'vue'
import type { Story, Meta } from '@storybook/vue3'

import { generateAttachments } from '../../generator'
import PEditorAttachments from './PEditorAttachments.vue'

export default {
	title: 'PEditor/PEditorAttachments',
	component: PEditorAttachments,
	argTypes: {
		count: {
			control: 'number'
		}
	}
} as Meta

const Template: Story = args => defineComponent({
	components: { PEditorAttachments },
	setup: () => ({
		args,
		items: ref(generateAttachments(args.count))
	}),
	template: '<p-editor-attachments v-model="items" :disabled="args.disabled"/>'
})

export const Default = Template.bind({})
Default.args = {
	count: 5
}

export const Disabled = Template.bind({})
Disabled.args = {
	count: 5,
	disabled: true
}
