import { ref } from 'vue'
import type { Story } from '@storybook/vue3'

import { generateAttachments } from '../../../generator/index.js'
import PEditorAttachments from './PEditorAttachments.vue'

export default {
	title: 'Editor / PEditorAttachments',
	component: PEditorAttachments,
	argTypes: {
		count: {
			control: 'number'
		}
	}
}

const Template: Story = args => ({
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
