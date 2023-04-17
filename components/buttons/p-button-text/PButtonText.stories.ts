import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonText from './PButtonText.vue'

type Story = StoryObj<typeof PButtonText>

export default {
	title: 'Buttons / PButtonText',
	component: PButtonText,
	argTypes: {
		default: {
			control: 'text'
		},
		type: {
			control: 'select',
			options: ['danger', 'target', 'muted']
		}
	}
} as Meta<typeof PButtonText>

export const Default: Story = {
	args: {
		default: 'Text Button'
	}
}

export const Target: Story = {
	args: {
		default: 'Target Text Button',
		type: 'target'
	}
}

export const Danger: Story = {
	args: {
		default: 'Danger Text Button',
		type: 'danger'
	}
}

export const Muted: Story = {
	args: {
		default: 'Muted Text Button',
		type: 'muted'
	}
}
