import type { Meta, StoryObj } from '@storybook/vue3'

import PKey from './PKey.vue'

type Story = StoryObj<typeof PKey>

export default {
	title: 'PKey',
	component: PKey,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PKey>

export const Default: Story = {
	args: {
		default: 'Enter'
	}
}
