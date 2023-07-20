import type { Meta, StoryObj } from '@storybook/vue3'

import PEditorClock from './PEditorClock.vue'

type Story = StoryObj<typeof PEditorClock>

export default {
	title: 'Editor / PEditorClock',
	component: PEditorClock,
	argTypes: {
		format: {
			control: 'select',
			options: ['12h', '24h']
		}
	}
} as Meta<typeof PEditorClock>

export const One: Story = {
	name: '12-hour',
	args: {
		format: '12h'
	}
}

export const Two: Story = {
	name: '24-hour',
	args: {
		format: '24h'
	}
}
