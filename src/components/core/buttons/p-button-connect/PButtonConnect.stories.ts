import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS } from '@postanu/shared'

import PButtonConnect from './PButtonConnect.vue'

type Story = StoryObj<typeof PButtonConnect> & {
	args?: {
		href?: string
	}
}

export default {
	title: 'Buttons / PButtonConnect',
	component: PButtonConnect,
	argTypes: {
		default: {
			control: 'text'
		},
		network: {
			control: 'select',
			options: NETWORKS
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
