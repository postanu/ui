import type { Meta, StoryObj } from '@storybook/vue3'

import PBadge from './PBadge.vue'

type Story = StoryObj<typeof PBadge>

export default {
	title: 'PBadge',
	component: PBadge,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PBadge>

export const Default: Story = {
	args: {
		default: 'Badge'
	}
}
