import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonCommon from './PButtonCommon.vue'

type Story = StoryObj<typeof PButtonCommon>

export default {
	title: 'Buttons / PButtonCommon',
	component: PButtonCommon,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonCommon>

export const Default: Story = {
	args: {
		default: 'Button Common'
	}
}
