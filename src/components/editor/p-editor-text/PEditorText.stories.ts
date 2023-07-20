import type { Meta, StoryObj } from '@storybook/vue3'

import PEditorText from './PEditorText.vue'

type Story = StoryObj<typeof PEditorText>

export default {
	title: 'Editor / PEditorText',
	component: PEditorText
} as Meta<typeof PEditorText>

export const Empty: Story = {}

// export const Filled: Story = {
// 	args: {
// 		text: 'I need a new leader, we need a new Luden'
// 	}
// }
