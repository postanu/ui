import type { Meta, StoryObj } from '@storybook/vue3'

import PButtonIcon from './PButtonIcon.vue'
import PIconFacebook from '../../icons/p-icon-facebook/PIconFacebook.vue'

type Story = StoryObj<typeof PButtonIcon>

export default {
	title: 'Buttons / PButtonIcon',
	component: PButtonIcon,
	argTypes: {
		default: {
			control: 'text'
		}
	}
} as Meta<typeof PButtonIcon>

export const Default: Story = {
	render: args => ({
		components: {
			PButtonIcon,
			PIconFacebook
		},
		setup: () => ({ args }),
		template: `
			<p-button-icon :href="args.href">
				${args.default}
			</p-button-icon>
		`
	}),
	args: {
		default: 'Button With Icon <p-icon-facebook />'
	}
}

export const Link: Story = {
	...Default,
	args: {
		default: 'Button Link With Icon <p-icon-facebook />',
		href: '#'
	}
}
