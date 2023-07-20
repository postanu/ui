import type { Meta, StoryObj } from '@storybook/vue3'

import { computed } from 'vue'

import { generateAttachments } from '../../../../generator/index.js'
import PEditorAttachments from './PEditorAttachments.vue'

type Story = StoryObj<typeof PEditorAttachments> & {
	args?: {
		count?: number
	}
}

export default {
	title: 'Editor / PEditorAttachments',
	component: PEditorAttachments,
	argTypes: {
		count: {
			control: 'number'
		}
	}
} as Meta<typeof PEditorAttachments>

export const Default: Story = {
	render: args => ({
		props: Object.keys(args),
		components: { PEditorAttachments },
		setup: props => ({
			props,
			items: computed(() => generateAttachments(props.count))
		}),
		template: `
			<p-editor-attachments v-model="items" :disabled="props.disabled" />
		`
	}),
	args: {
		count: 5
	}
}

export const Disabled: Story = {
	...Default,
	args: {
		count: 5,
		disabled: true
	}
}
