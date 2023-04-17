import type { Meta, StoryObj } from '@storybook/vue3'

import PButton from './PButton.vue'

type Story = StoryObj<typeof PButton>

export default {
	title: 'Buttons / PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButton>

export const Default: Story = {
	args: {
		default: 'Default Button'
	}
}

export const Link: Story = {
	args: {
		default: 'Link Button',
		href: '#'
	}
}

export const Disabled: Story = {
	args: {
		default: 'Disabled Button',
		disabled: true
	}
}
