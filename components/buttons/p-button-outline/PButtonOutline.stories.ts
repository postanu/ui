import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonOutline from './PButtonOutline.vue'

type Story = StoryObj<typeof PButtonOutline>

export default {
	title: 'Buttons / PButtonOutline',
	component: PButtonOutline,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonOutline>

export const Default: Story = {
	args: {
		default: 'Button Outline'
	}
}
