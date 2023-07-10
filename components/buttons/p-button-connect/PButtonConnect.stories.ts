import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS_ORDER } from '@postanu/core'

import PButtonConnect from './PButtonConnect.vue'

type Story = StoryObj<typeof PButtonConnect>

export default {
	title: 'Buttons / PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		default: {
			control: 'text'
		},
		network: {
			control: 'select',
			options: NETWORKS_ORDER
		}
	}
} as Meta<typeof PButtonConnect>

export const Default: Story = {
	args: {
		default: 'Facebook',
		network: 'facebook',
		href: '#'
	}
}
