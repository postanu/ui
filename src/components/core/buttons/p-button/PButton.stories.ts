import type { Meta, StoryObj } from '@storybook/vue3'

import PButton from './PButton.vue'

type Story = StoryObj<typeof PButton> & {
	args?: {
		href?: string
		disabled?: boolean
	}
}

export default {
	title: 'Buttons / PButton',
	component: PButton,
	argTypes: {
		default: {
			control: 'text'
		},
		href: {
			control: 'text'
		},
		disabled: {
			control: 'boolean'
		}
	}
} as Meta<typeof PButton>

const Template: Story = {
	render: args => ({
		components: { PButton },
		setup: () => ({ args }),
		template: `
			<p-button
				:href="args.href"
				:disabled="args.disabled"
			>
				{{ args.default }}
			</p-button>
		`
	})
}

export const Default: Story = {
	...Template,
	args: {
		default: 'Default Button'
	}
}

export const Link: Story = {
	...Template,
	args: {
		default: 'Link Button',
		href: '#'
	}
}

export const Disabled: Story = {
	...Template,
	args: {
		default: 'Disabled Button',
		disabled: true
	}
}
