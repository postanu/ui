import type { Meta, StoryObj } from '@storybook/vue3'

import { computed } from 'vue'

import { generateAttachments } from '../../../../generator/index.js'
import PEditorAttachments from './PEditorAttachments.vue'

type Story = StoryObj<typeof PEditorAttachments>

export default {
	title: 'Editor / PEditorAttachments',
	component: PEditorAttachments,
	argTypes: {
		count: {
			control: {
				type: 'number',
				min: 0,
				max: 10
			}
		}
	}
} as Meta<typeof PEditorAttachments>

export const Template: Story = {
	render: args => ({
		components: { PEditorAttachments },
		setup: () => ({
			args,
			// @ts-expect-error
			items: computed(() => generateAttachments(args.count))
		}),
		template: `
			<p-editor-attachments v-model="items" :disabled="args.disabled" />
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		// @ts-expect-error
		count: 5
	}
}
