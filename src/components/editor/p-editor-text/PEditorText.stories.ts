import type { Meta, StoryObj } from '@storybook/vue3'

import { ref } from 'vue'

import PEditorText from './PEditorText.vue'

type Story = StoryObj<typeof PEditorText>

export default {
	title: 'Editor / PEditorText',
	component: PEditorText
} as Meta<typeof PEditorText>

const Template: Story = {
	render: args => ({
		components: { PEditorText },
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		setup: () => {
			let text = ref(args.text)
			return {
				...args,
				text
			}
		},
		template: `
			<p-editor-text
				v-model:text="text"
				:placeholder="placeholder"
			/>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		text: '',
		placeholder: 'Type something'
	}
}
