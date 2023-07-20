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
		variant: {
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
		variant: 'target'
	}
}

export const Danger: Story = {
	args: {
		default: 'Danger Text Button',
		variant: 'danger'
	}
}

export const Muted: Story = {
	args: {
		default: 'Muted Text Button',
		variant: 'muted'
	}
}
