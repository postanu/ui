import type { Meta, StoryObj } from '@storybook/vue3'

import PCaption from './PCaption.vue'

type Story = StoryObj<typeof PCaption>

export default {
	title: 'Typography / PCaption',
	component: PCaption
} as Meta<typeof PCaption>

export const Default: Story = {
	args: {
		default: 'Alright, you call this a connection?'
	}
}
