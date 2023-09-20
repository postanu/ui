import type { Meta, StoryObj } from '@storybook/vue3'

import { NETWORKS_ORDER } from '@postanu/core'

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
			options: NETWORKS_ORDER
		}
	}
} as Meta<typeof PIconNetwork>

export const Default: Story = {
	args: {
		network: 'facebook'
	}
}
