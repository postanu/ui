import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS } from '@postanu/shared'

import PIconNetwork from './PIconNetwork.vue'

type Story = StoryObj<typeof PIconNetwork>

export default {
	title: 'Icons / PIconNetwork',
	component: PIconNetwork,
	argTypes: {
		network: {
			control: {
				type: 'select'
			},
			options: NETWORKS
		}
	}
} as Meta<typeof PIconNetwork>

export const Default: Story = {
	args: {
		network: 'facebook'
	}
}
